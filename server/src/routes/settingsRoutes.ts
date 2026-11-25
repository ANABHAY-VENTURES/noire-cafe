import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';

const router = Router();

router.get('/', getSettings);
router.put('/', authenticate, authorize(['admin']), updateSettings);

export default router;
