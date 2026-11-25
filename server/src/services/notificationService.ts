import { Notification } from '../models/Notification.js';

export const createNotification = async ({
  title,
  message,
  type = 'system',
  targetRole = 'all',
  metadata = {},
}: {
  title: string;
  message: string;
  type?: 'order' | 'reservation' | 'inventory_low' | 'system';
  targetRole?: 'admin' | 'staff' | 'all';
  metadata?: Record<string, any>;
}): Promise<void> => {
  try {
    await Notification.create({
      title,
      message,
      type,
      targetRole,
      metadata,
    });
    console.log(`[Notification Created] [${type.toUpperCase()}] ${title}`);
  } catch (err: any) {
    console.error('[Notification Error]:', err.message);
  }
};
