import mongoose, { Schema, Document } from 'mongoose';

export interface IInventoryItem extends Document {
  name: string;
  category: 'Coffee Beans' | 'Dairy & Plant Milk' | 'Bakery & Flour' | 'Syrups & Botanicals' | 'Tea & Matcha' | 'Packaging';
  currentStock: number;
  unit: 'kg' | 'g' | 'L' | 'ml' | 'units' | 'pcs';
  minThreshold: number;
  costPerUnitInr: number;
  supplier: string;
  lastRestockedAt?: Date;
  isLowStock: boolean;
}

const InventoryItemSchema = new Schema<IInventoryItem>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    category: {
      type: String,
      enum: ['Coffee Beans', 'Dairy & Plant Milk', 'Bakery & Flour', 'Syrups & Botanicals', 'Tea & Matcha', 'Packaging'],
      required: true,
      index: true,
    },
    currentStock: { type: Number, required: true, default: 0, min: 0 },
    unit: { type: String, enum: ['kg', 'g', 'L', 'ml', 'units', 'pcs'], required: true },
    minThreshold: { type: Number, required: true, default: 5 },
    costPerUnitInr: { type: Number, required: true, default: 0 },
    supplier: { type: String, default: 'Direct Trade' },
    lastRestockedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

InventoryItemSchema.virtual('isLowStock').get(function () {
  return this.currentStock <= this.minThreshold;
});

export const InventoryItem = mongoose.model<IInventoryItem>('InventoryItem', InventoryItemSchema);
