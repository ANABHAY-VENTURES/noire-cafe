import { Request, Response } from 'express';
import { Notification } from '../models/Notification.js';

export const getNotifications = async (_req: Request, res: Response): Promise<void> => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(30);
    const unreadCount = await Notification.countDocuments({ isRead: false });

    res.json({
      success: true,
      notifications,
      unreadCount,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markAsRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndUpdate(id, { isRead: true });
    res.json({ success: true, message: 'Notification marked as read.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markAllAsRead = async (_req: Request, res: Response): Promise<void> => {
  try {
    await Notification.updateMany({ isRead: false }, { isRead: true });
    res.json({ success: true, message: 'All notifications marked as read.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
