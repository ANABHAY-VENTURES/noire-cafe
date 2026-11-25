import { Router } from 'express';
import {
  getInventory,
  createInventoryItem,
  updateInventoryItem,
  recordPurchaseEntry,
  getInventoryTransactions,
} from '../controllers/inventoryController.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';

const router = Router();

router.use(authenticate);

router.get('/', getInventory);
router.post('/', authorize(['admin']), createInventoryItem);
router.patch('/:id', authorize(['admin', 'staff']), updateInventoryItem);
router.post('/purchase', authorize(['admin', 'staff']), recordPurchaseEntry);
router.get('/transactions', getInventoryTransactions);

export default router;
