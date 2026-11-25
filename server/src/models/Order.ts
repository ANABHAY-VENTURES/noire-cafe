import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  menuItemId: string;
  name: string;
  priceInr: number;
  quantity: number;
  subtotalInr: number;
  image?: string;
}

export interface IOrderCustomer {
  name: string;
  email: string;
  phone: string;
  tableNumber?: string;
  deliveryAddress?: string;
  orderType: 'dine_in' | 'takeaway' | 'delivery';
  notes?: string;
}

export interface IOrderPayment {
  method: 'razorpay' | 'cash' | 'card' | 'upi';
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  paidAt?: Date;
  amountInr: number;
}

export interface IOrder extends Document {
  orderId: string; // e.g. NC-20261125-0042
  customer: IOrderCustomer;
  items: IOrderItem[];
  subtotalInr: number;
  taxInr: number;
  discountInr: number;
  totalInr: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  payment: IOrderPayment;
  inventoryDeducted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    menuItemId: { type: String, required: true },
    name: { type: String, required: true },
    priceInr: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    subtotalInr: { type: Number, required: true },
    image: { type: String },
  },
  { _id: false }
);

const OrderCustomerSchema = new Schema<IOrderCustomer>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    tableNumber: { type: String, default: '' },
    deliveryAddress: { type: String, default: '' },
    orderType: { type: String, enum: ['dine_in', 'takeaway', 'delivery'], default: 'dine_in' },
    notes: { type: String, default: '' },
  },
  { _id: false }
);

const OrderPaymentSchema = new Schema<IOrderPayment>(
  {
    method: { type: String, enum: ['razorpay', 'cash', 'card', 'upi'], default: 'razorpay' },
    status: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    paidAt: { type: Date },
    amountInr: { type: Number, required: true },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    customer: { type: OrderCustomerSchema, required: true },
    items: { type: [OrderItemSchema], required: true },
    subtotalInr: { type: Number, required: true },
    taxInr: { type: Number, default: 0 },
    discountInr: { type: Number, default: 0 },
    totalInr: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'],
      default: 'pending',
      index: true,
    },
    payment: { type: OrderPaymentSchema, required: true },
    inventoryDeducted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Helpful compound indexes
OrderSchema.index({ createdAt: -1 });
OrderSchema.index({ 'customer.email': 1 });
OrderSchema.index({ 'customer.phone': 1 });

export const Order = mongoose.model<IOrder>('Order', OrderSchema);
