import { Router } from 'express';
import {
  getDashboardOverview,
  getSalesTimeline,
  getTopSellingProducts,
} from '../controllers/analyticsController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

router.get('/overview', getDashboardOverview);
router.get('/sales', getSalesTimeline);
router.get('/top-products', getTopSellingProducts);

export default router;
