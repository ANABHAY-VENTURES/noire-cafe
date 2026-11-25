import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  title: string;
  message: string;
  type: 'order' | 'reservation' | 'inventory_low' | 'system';
  targetRole: 'admin' | 'staff' | 'all';
  isRead: boolean;
  metadata?: Record<string, any>;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ['order', 'reservation', 'inventory_low', 'system'],
      default: 'system',
      index: true,
    },
    targetRole: { type: String, enum: ['admin', 'staff', 'all'], default: 'all' },
    isRead: { type: Boolean, default: false, index: true },
    metadata: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export const Notification = mongoose.model<INotification>('Notification', NotificationSchema);
