import { Request, Response } from 'express';
import { Order } from '../models/Order.js';
import { Reservation } from '../models/Reservation.js';
import { InventoryItem } from '../models/InventoryItem.js';

export const getDashboardOverview = async (_req: Request, res: Response): Promise<void> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Aggregate revenue & order counts
    const [
      allOrders,
      todayOrders,
      weekOrders,
      monthOrders,
      activeOrdersCount,
      todayReservationsCount,
      pendingReservationsCount,
      lowStockItemsCount,
    ] = await Promise.all([
      Order.find({ 'payment.status': 'paid' }),
      Order.find({ 'payment.status': 'paid', createdAt: { $gte: today } }),
      Order.find({ 'payment.status': 'paid', createdAt: { $gte: sevenDaysAgo } }),
      Order.find({ 'payment.status': 'paid', createdAt: { $gte: thirtyDaysAgo } }),
      Order.countDocuments({ status: { $in: ['pending', 'confirmed', 'preparing', 'ready'] } }),
      Reservation.countDocuments({ date: today.toISOString().slice(0, 10), status: 'confirmed' }),
      Reservation.countDocuments({ status: 'pending' }),
      InventoryItem.countDocuments({ $expr: { $lte: ['$currentStock', '$minThreshold'] } }),
    ]);

    const totalRevenue = allOrders.reduce((sum, o) => sum + o.totalInr, 0);
    const todayRevenue = todayOrders.reduce((sum, o) => sum + o.totalInr, 0);
    const weekRevenue = weekOrders.reduce((sum, o) => sum + o.totalInr, 0);
    const monthRevenue = monthOrders.reduce((sum, o) => sum + o.totalInr, 0);

    const totalOrdersCount = allOrders.length;
    const averageOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;

    res.json({
      success: true,
      metrics: {
        totalRevenue,
        todayRevenue,
        weekRevenue,
        monthRevenue,
        totalOrders: totalOrdersCount,
        averageOrderValue,
        activeOrders: activeOrdersCount,
        todayReservations: todayReservationsCount,
        pendingReservations: pendingReservationsCount,
        lowStockItems: lowStockItemsCount,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSalesTimeline = async (req: Request, res: Response): Promise<void> => {
  try {
    const days = parseInt(req.query.days as string) || 7;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    const orders = await Order.find({
      'payment.status': 'paid',
      createdAt: { $gte: startDate },
    }).sort({ createdAt: 1 });

    const timelineMap: Record<string, { date: string; revenue: number; ordersCount: number }> = {};

    // Initialize map
    for (let i = 0; i <= days; i++) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      timelineMap[key] = { date: key, revenue: 0, ordersCount: 0 };
    }

    for (const order of orders) {
      const key = new Date(order.createdAt).toISOString().slice(0, 10);
      if (timelineMap[key]) {
        timelineMap[key].revenue += order.totalInr;
        timelineMap[key].ordersCount += 1;
      }
    }

    res.json({
      success: true,
      timeline: Object.values(timelineMap),
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTopSellingProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find({ 'payment.status': 'paid' });

    const productMap: Record<string, { id: string; name: string; quantity: number; revenue: number; image?: string }> = {};

    for (const order of orders) {
      for (const item of order.items) {
        if (!productMap[item.menuItemId]) {
          productMap[item.menuItemId] = {
            id: item.menuItemId,
            name: item.name,
            quantity: 0,
            revenue: 0,
            image: item.image,
          };
        }
        productMap[item.menuItemId].quantity += item.quantity;
        productMap[item.menuItemId].revenue += item.subtotalInr;
      }
    }

    const topProducts = Object.values(productMap)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 8);

    res.json({
      success: true,
      topProducts,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
