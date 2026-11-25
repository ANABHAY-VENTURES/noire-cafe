import { Request, Response } from 'express';
import { MenuItem } from '../models/MenuItem.js';
import { Category } from '../models/Category.js';

export const getMenuItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, availableOnly } = req.query;

    const query: any = {};
    if (category && category !== 'all') {
      query.category = category;
    }
    if (availableOnly === 'true') {
      query.isAvailable = true;
    }

    const items = await MenuItem.find(query).sort({ category: 1, name: 1 });
    res.json({ success: true, items });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createMenuItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      id,
      name,
      category,
      description,
      price,
      priceInr,
      origin,
      elevation,
      process,
      notes,
      image,
      badge,
      temperature,
      recipeIngredients,
    } = req.body;

    if (!id || !name || !category || !priceInr || !image) {
      res.status(400).json({ success: false, message: 'ID, name, category, price, and image are required.' });
      return;
    }

    const existing = await MenuItem.findOne({ id });
    if (existing) {
      res.status(400).json({ success: false, message: 'Item with this ID already exists.' });
      return;
    }

    const newItem = await MenuItem.create({
      id: id.toLowerCase().trim(),
      name: name.trim(),
      category: category.toLowerCase().trim(),
      description: description || '',
      price: price || `₹${priceInr}`,
      priceInr: parseFloat(priceInr),
      origin: origin || '',
      elevation: elevation || '',
      process: process || '',
      notes: Array.isArray(notes) ? notes : [],
      image,
      badge: badge || '',
      temperature: temperature || 'Hot',
      recipeIngredients: Array.isArray(recipeIngredients) ? recipeIngredients : [],
    });

    res.status(201).json({ success: true, item: newItem });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateMenuItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.priceInr && !updates.price) {
      updates.price = `₹${updates.priceInr}`;
    }

    const item = await MenuItem.findOneAndUpdate({ id }, updates, { new: true, runValidators: true });
    if (!item) {
      res.status(404).json({ success: false, message: 'Menu item not found.' });
      return;
    }

    res.json({ success: true, item });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleItemAvailability = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await MenuItem.findOne({ id });

    if (!item) {
      res.status(404).json({ success: false, message: 'Menu item not found.' });
      return;
    }

    item.isAvailable = !item.isAvailable;
    await item.save();

    res.json({
      success: true,
      message: `${item.name} is now ${item.isAvailable ? 'available' : 'unavailable'}.`,
      item,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteMenuItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await MenuItem.findOneAndDelete({ id });

    if (!deleted) {
      res.status(404).json({ success: false, message: 'Menu item not found.' });
      return;
    }

    res.json({ success: true, message: `Deleted ${deleted.name}.` });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, categories });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
