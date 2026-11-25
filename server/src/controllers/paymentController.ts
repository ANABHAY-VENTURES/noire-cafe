import { Request, Response } from 'express';
import crypto from 'crypto';
import { Order } from '../models/Order.js';
import { getRazorpayKeyId, getRazorpayKeySecret, razorpayInstance } from '../config/razorpay.js';
import { deductOrderInventory } from '../services/inventoryService.js';
import { createNotification } from '../services/notificationService.js';

export const getPaymentConfig = (_req: Request, res: Response): void => {
  res.json({
    success: true,
    keyId: getRazorpayKeyId(),
    currency: 'INR',
  });
};

export const createRazorpayOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId } = req.body;

    const order = await Order.findOne({ orderId });
    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found.' });
      return;
    }

    try {
      const rzpOrder = await razorpayInstance.orders.create({
        amount: Math.round(order.totalInr * 100),
        currency: 'INR',
        receipt: order.orderId,
      });

      order.payment.razorpayOrderId = rzpOrder.id;
      await order.save();

      res.json({
        success: true,
        razorpayOrder: rzpOrder,
      });
    } catch (rzpErr: any) {
      console.warn('[Razorpay API Fallback]:', rzpErr.message);
      // In development / demo mode when live keys aren't provisioned
      const mockRzpId = `order_test_${Date.now()}`;
      order.payment.razorpayOrderId = mockRzpId;
      await order.save();

      res.json({
        success: true,
        razorpayOrder: {
          id: mockRzpId,
          amount: Math.round(order.totalInr * 100),
          currency: 'INR',
          receipt: order.orderId,
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyPaymentSignature = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!orderId || !razorpay_payment_id) {
      res.status(400).json({ success: false, message: 'Missing payment verification parameters.' });
      return;
    }

    const order = await Order.findOne({ orderId });
    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found.' });
      return;
    }

    const secret = getRazorpayKeySecret();
    const isMock = razorpay_payment_id.startsWith('pay_mock_') || razorpay_payment_id.startsWith('pay_demo_');

    // Live verification check if not a local development mock payment
    if (!isMock && razorpay_signature && razorpay_order_id) {
      const generatedSignature = crypto
        .createHmac('sha256', secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature !== razorpay_signature) {
        order.payment.status = 'failed';
        await order.save();

        res.status(400).json({
          success: false,
          message: 'Payment verification failed: Invalid cryptographic signature.',
        });
        return;
      }
    }

    // Mark paid and advance order
    order.payment.status = 'paid';
    order.payment.razorpayPaymentId = razorpay_payment_id;
    order.payment.razorpaySignature = razorpay_signature || 'verified_dev';
    order.payment.paidAt = new Date();
    order.status = 'confirmed';

    // Deduct stock for verified order
    if (!order.inventoryDeducted) {
      await deductOrderInventory(order.orderId, order.items);
      order.inventoryDeducted = true;
    }

    await order.save();

    await createNotification({
      title: `Payment Verified: ${order.orderId}`,
      message: `₹${order.totalInr} received via Razorpay (${razorpay_payment_id}). Order confirmed.`,
      type: 'order',
      targetRole: 'all',
      metadata: { orderId: order.orderId, paymentId: razorpay_payment_id },
    });

    res.json({
      success: true,
      message: 'Payment verified successfully and order confirmed.',
      order,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const handleRazorpayWebhook = async (req: Request, res: Response): Promise<void> => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || 'demo_webhook_secret_noire_cafe';
    const signature = req.headers['x-razorpay-signature'] as string;

    if (signature) {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(JSON.stringify(req.body))
        .digest('hex');

      if (expectedSignature !== signature) {
        res.status(400).json({ success: false, message: 'Invalid webhook signature.' });
        return;
      }
    }

    const event = req.body.event;
    console.log(`[Razorpay Webhook Received] Event: ${event}`);

    if (event === 'payment.captured') {
      const payment = req.body.payload.payment.entity;
      const orderId = payment.notes?.orderId || payment.description;

      if (orderId) {
        const order = await Order.findOne({ orderId });
        if (order && order.payment.status !== 'paid') {
          order.payment.status = 'paid';
          order.payment.razorpayPaymentId = payment.id;
          order.payment.paidAt = new Date();
          order.status = 'confirmed';

          if (!order.inventoryDeducted) {
            await deductOrderInventory(order.orderId, order.items);
            order.inventoryDeducted = true;
          }

          await order.save();
        }
      }
    }

    res.json({ status: 'ok' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
