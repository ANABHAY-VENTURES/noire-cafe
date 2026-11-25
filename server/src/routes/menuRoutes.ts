import { Router } from 'express';
import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  toggleItemAvailability,
  deleteMenuItem,
  getCategories,
} from '../controllers/menuController.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';

const router = Router();

// Public menu reads
router.get('/', getMenuItems);
router.get('/categories', getCategories);

// Protected Admin/Staff routes
router.post('/', authenticate, authorize(['admin']), createMenuItem);
router.put('/:id', authenticate, authorize(['admin']), updateMenuItem);
router.patch('/:id/toggle-availability', authenticate, toggleItemAvailability);
router.delete('/:id', authenticate, authorize(['admin']), deleteMenuItem);

export default router;
