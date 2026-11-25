import { Router } from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Public routes
router.post('/', createOrder);
router.get('/track/:orderId', getOrderById);

// Staff / Admin routes
router.get('/', authenticate, getAllOrders);
router.get('/:orderId', authenticate, getOrderById);
router.patch('/:orderId/status', authenticate, updateOrderStatus);

export default router;
