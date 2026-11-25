import mongoose, { Schema, Document } from 'mongoose';

export interface IRecipeIngredient {
  ingredientId: mongoose.Types.ObjectId;
  name: string;
  quantity: number;
  unit: string;
}

export interface IMenuItem extends Document {
  id: string; // custom slug like esp-1
  name: string;
  category: string; // category id e.g. 'espresso', 'signature'
  description: string;
  price: string; // formatted e.g. ₹100
  priceInr: number;
  origin?: string;
  elevation?: string;
  process?: string;
  notes: string[];
  image: string;
  badge?: string;
  temperature?: 'Hot' | 'Iced' | 'Both';
  isAvailable: boolean;
  recipeIngredients: IRecipeIngredient[];
}

const RecipeIngredientSchema = new Schema<IRecipeIngredient>(
  {
    ingredientId: { type: Schema.Types.ObjectId, ref: 'InventoryItem', required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
  },
  { _id: false }
);

const MenuItemSchema = new Schema<IMenuItem>(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, index: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    priceInr: { type: Number, required: true, min: 0 },
    origin: { type: String, default: '' },
    elevation: { type: String, default: '' },
    process: { type: String, default: '' },
    notes: [{ type: String }],
    image: { type: String, required: true },
    badge: { type: String, default: '' },
    temperature: { type: String, enum: ['Hot', 'Iced', 'Both'], default: 'Hot' },
    isAvailable: { type: Boolean, default: true, index: true },
    recipeIngredients: [RecipeIngredientSchema],
  },
  { timestamps: true }
);

export const MenuItem = mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);
