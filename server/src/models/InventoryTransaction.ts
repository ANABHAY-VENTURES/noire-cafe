import mongoose, { Schema, Document } from 'mongoose';

export interface IInventoryTransaction extends Document {
  ingredientId: mongoose.Types.ObjectId;
  ingredientName: string;
  type: 'purchase' | 'consumption_order' | 'adjustment' | 'spoilage';
  quantityDelta: number; // Positive for additions, negative for deductions
  unit: string;
  orderId?: string;
  costInr?: number;
  notes?: string;
  performedBy?: string;
  createdAt: Date;
}

const InventoryTransactionSchema = new Schema<IInventoryTransaction>(
  {
    ingredientId: { type: Schema.Types.ObjectId, ref: 'InventoryItem', required: true, index: true },
    ingredientName: { type: String, required: true },
    type: {
      type: String,
      enum: ['purchase', 'consumption_order', 'adjustment', 'spoilage'],
      required: true,
      index: true,
    },
    quantityDelta: { type: Number, required: true },
    unit: { type: String, required: true },
    orderId: { type: String, index: true },
    costInr: { type: Number, default: 0 },
    notes: { type: String, default: '' },
    performedBy: { type: String, default: 'System' },
  },
  { timestamps: true }
);

export const InventoryTransaction = mongoose.model<IInventoryTransaction>(
  'InventoryTransaction',
  InventoryTransactionSchema
);
