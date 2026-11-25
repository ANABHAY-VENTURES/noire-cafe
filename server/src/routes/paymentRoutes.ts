import { Router } from 'express';
import {
  getPaymentConfig,
  createRazorpayOrder,
  verifyPaymentSignature,
  handleRazorpayWebhook,
} from '../controllers/paymentController.js';

const router = Router();

router.get('/config', getPaymentConfig);
router.post('/create-order', createRazorpayOrder);
router.post('/verify', verifyPaymentSignature);
router.post('/webhook', handleRazorpayWebhook);

export default router;
