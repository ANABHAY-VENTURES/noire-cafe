import { MenuItem } from '../models/MenuItem.js';
import { InventoryItem } from '../models/InventoryItem.js';
import { InventoryTransaction } from '../models/InventoryTransaction.js';
import { createNotification } from './notificationService.js';

/**
 * Deduct inventory based on recipe requirements for items in an order
 */
export const deductOrderInventory = async (orderId: string, items: Array<{ menuItemId: string; quantity: number }>): Promise<void> => {
  for (const item of items) {
    const menuItem = await MenuItem.findOne({ id: item.menuItemId });
    if (!menuItem || !menuItem.recipeIngredients || menuItem.recipeIngredients.length === 0) {
      continue;
    }

    for (const recipe of menuItem.recipeIngredients) {
      const deductionAmount = recipe.quantity * item.quantity;
      const invItem = await InventoryItem.findById(recipe.ingredientId);

      if (invItem) {
        invItem.currentStock = Math.max(0, invItem.currentStock - deductionAmount);
        await invItem.save();

        // Record transaction
        await InventoryTransaction.create({
          ingredientId: invItem._id,
          ingredientName: invItem.name,
          type: 'consumption_order',
          quantityDelta: -deductionAmount,
          unit: recipe.unit,
          orderId,
          notes: `Consumed for order ${orderId} (${item.quantity}x ${menuItem.name})`,
        });

        // Trigger low-stock notification if threshold is reached
        if (invItem.currentStock <= invItem.minThreshold) {
          await createNotification({
            title: `Low Stock Alert: ${invItem.name}`,
            message: `Current stock of ${invItem.name} is down to ${invItem.currentStock} ${invItem.unit} (Threshold: ${invItem.minThreshold} ${invItem.unit}). Restock recommended.`,
            type: 'inventory_low',
            targetRole: 'admin',
            metadata: { ingredientId: invItem._id, currentStock: invItem.currentStock },
          });
        }
      }
    }
  }
};
