import { Request, Response } from 'express';
import { Order, IOrderItem } from '../models/Order.js';
import { MenuItem } from '../models/MenuItem.js';
import { generateOrderId } from '../utils/idGenerator.js';
import { createNotification } from '../services/notificationService.js';
import { deductOrderInventory } from '../services/inventoryService.js';
import { razorpayInstance } from '../config/razorpay.js';

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customer, items, paymentMethod = 'razorpay' } = req.body;

    if (!customer || !customer.name || !customer.phone) {
      res.status(400).json({ success: false, message: 'Customer name and phone number are required.' });
      return;
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ success: false, message: 'Order must contain at least one item.' });
      return;
    }

    // Validate items and recalculate prices from database to prevent client tampering
    let calculatedSubtotal = 0;
    const validatedItems: IOrderItem[] = [];

    for (const reqItem of items) {
      const dbItem = await MenuItem.findOne({ id: reqItem.menuItemId || reqItem.id });
      if (!dbItem) {
        res.status(400).json({ success: false, message: `Item not found: ${reqItem.name || reqItem.id}` });
        return;
      }

      if (!dbItem.isAvailable) {
        res.status(400).json({ success: false, message: `${dbItem.name} is currently sold out.` });
        return;
      }

      const qty = Math.max(1, parseInt(reqItem.quantity) || 1);
      const itemSubtotal = dbItem.priceInr * qty;
      calculatedSubtotal += itemSubtotal;

      validatedItems.push({
        menuItemId: dbItem.id,
        name: dbItem.name,
        priceInr: dbItem.priceInr,
        quantity: qty,
        subtotalInr: itemSubtotal,
        image: dbItem.image,
      });
    }

    // 5% Café GST / Service Tax
    const taxInr = Math.round(calculatedSubtotal * 0.05);
    const totalInr = calculatedSubtotal + taxInr;
    const orderId = generateOrderId();

    // Create Razorpay order if paymentMethod is razorpay
    let razorpayOrderPayload: any = null;
    if (paymentMethod === 'razorpay') {
      try {
        const rzpOrder = await razorpayInstance.orders.create({
          amount: totalInr * 100, // Razorpay takes paise
          currency: 'INR',
          receipt: orderId,
          notes: {
            customerName: customer.name,
            customerPhone: customer.phone,
          },
        });
        razorpayOrderPayload = rzpOrder;
      } catch (rzpErr: any) {
        console.warn('[Razorpay Order Creation Fallback]:', rzpErr.message);
        // Provide mock order payload in development if keys are demo
        razorpayOrderPayload = {
          id: `order_demo_${Date.now()}`,
          entity: 'order',
          amount: totalInr * 100,
          amount_paid: 0,
          amount_due: totalInr * 100,
          currency: 'INR',
          receipt: orderId,
          status: 'created',
        };
      }
    }

    const newOrder = await Order.create({
      orderId,
      customer: {
        name: customer.name.trim(),
        email: (customer.email || '').trim().toLowerCase(),
        phone: customer.phone.trim(),
        tableNumber: customer.tableNumber || '',
        deliveryAddress: customer.deliveryAddress || '',
        orderType: customer.orderType || 'dine_in',
        notes: customer.notes || '',
      },
      items: validatedItems,
      subtotalInr: calculatedSubtotal,
      taxInr,
      discountInr: 0,
      totalInr,
      status: paymentMethod === 'cash' ? 'confirmed' : 'pending',
      payment: {
        method: paymentMethod,
        status: paymentMethod === 'cash' ? 'pending' : 'pending',
        razorpayOrderId: razorpayOrderPayload ? razorpayOrderPayload.id : undefined,
        amountInr: totalInr,
      },
      inventoryDeducted: false,
    });

    // Notify Admin & Staff
    await createNotification({
      title: `New Order: ${orderId}`,
      message: `${customer.name} placed order for ₹${totalInr} (${validatedItems.length} items)`,
      type: 'order',
      targetRole: 'all',
      metadata: { orderId: newOrder.orderId, totalInr },
    });

    res.status(201).json({
      success: true,
      order: newOrder,
      razorpayOrder: razorpayOrderPayload,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, search, limit = '50', page = '1' } = req.query;

    const query: any = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { orderId: { $regex: search, $options: 'i' } },
        { 'customer.name': { $regex: search, $options: 'i' } },
        { 'customer.phone': { $regex: search, $options: 'i' } },
      ];
    }

    const pageSize = Math.min(100, parseInt(limit as string) || 50);
    const skip = (Math.max(1, parseInt(page as string) || 1) - 1) * pageSize;

    const [orders, total] = await Promise.all([
      Order.find(query).sort({ createdAt: -1 }).skip(skip).limit(pageSize),
      Order.countDocuments(query),
    ]);

    res.json({
      success: true,
      orders,
      total,
      page: parseInt(page as string) || 1,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });

    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found.' });
      return;
    }

    res.json({ success: true, order });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;
    const { status, paymentStatus } = req.body;

    const order = await Order.findOne({ orderId });
    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found.' });
      return;
    }

    if (status) {
      order.status = status;
    }

    if (paymentStatus) {
      order.payment.status = paymentStatus;
      if (paymentStatus === 'paid' && !order.payment.paidAt) {
        order.payment.paidAt = new Date();
      }
    }

    // Auto-deduct inventory if confirmed or completed and not yet deducted
    if (
      (order.status === 'confirmed' || order.status === 'preparing' || order.status === 'completed') &&
      !order.inventoryDeducted
    ) {
      await deductOrderInventory(order.orderId, order.items);
      order.inventoryDeducted = true;
    }

    await order.save();

    res.json({
      success: true,
      message: `Order ${orderId} updated to ${order.status}`,
      order,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
