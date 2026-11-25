import { Request, Response } from 'express';
import { InventoryItem } from '../models/InventoryItem.js';
import { InventoryTransaction } from '../models/InventoryTransaction.js';
import { createNotification } from '../services/notificationService.js';

export const getInventory = async (_req: Request, res: Response): Promise<void> => {
  try {
    const items = await InventoryItem.find().sort({ category: 1, name: 1 });
    const lowStockCount = items.filter((item) => item.currentStock <= item.minThreshold).length;

    res.json({
      success: true,
      items,
      lowStockCount,
      totalItems: items.length,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createInventoryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, category, currentStock, unit, minThreshold, costPerUnitInr, supplier } = req.body;

    if (!name || !category || !unit) {
      res.status(400).json({ success: false, message: 'Name, category, and unit are required.' });
      return;
    }

    const item = await InventoryItem.create({
      name: name.trim(),
      category,
      currentStock: Math.max(0, parseFloat(currentStock) || 0),
      unit,
      minThreshold: Math.max(1, parseFloat(minThreshold) || 5),
      costPerUnitInr: Math.max(0, parseFloat(costPerUnitInr) || 0),
      supplier: supplier || 'Direct Trade',
      lastRestockedAt: new Date(),
    });

    res.status(201).json({ success: true, item });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateInventoryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const item = await InventoryItem.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!item) {
      res.status(404).json({ success: false, message: 'Item not found.' });
      return;
    }

    res.json({ success: true, item });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const recordPurchaseEntry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ingredientId, quantityAdded, costInr, notes } = req.body;

    if (!ingredientId || !quantityAdded || quantityAdded <= 0) {
      res.status(400).json({ success: false, message: 'Ingredient ID and positive quantity required.' });
      return;
    }

    const item = await InventoryItem.findById(ingredientId);
    if (!item) {
      res.status(404).json({ success: false, message: 'Inventory item not found.' });
      return;
    }

    const qty = parseFloat(quantityAdded);
    item.currentStock += qty;
    item.lastRestockedAt = new Date();
    await item.save();

    const transaction = await InventoryTransaction.create({
      ingredientId: item._id,
      ingredientName: item.name,
      type: 'purchase',
      quantityDelta: qty,
      unit: item.unit,
      costInr: parseFloat(costInr) || 0,
      notes: notes || `Restocked ${qty} ${item.unit}`,
      performedBy: 'Admin',
    });

    await createNotification({
      title: `Restocked: ${item.name}`,
      message: `Added ${qty} ${item.unit} to ${item.name}. Total now: ${item.currentStock} ${item.unit}`,
      type: 'system',
      targetRole: 'staff',
    });

    res.json({
      success: true,
      message: `Successfully restocked ${item.name}.`,
      item,
      transaction,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getInventoryTransactions = async (_req: Request, res: Response): Promise<void> => {
  try {
    const transactions = await InventoryTransaction.find().sort({ createdAt: -1 }).limit(100);
    res.json({ success: true, transactions });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
