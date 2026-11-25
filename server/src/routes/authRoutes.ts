import { Router } from 'express';
import { login, getMe, registerStaff } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/rbac.js';

const router = Router();

router.post('/login', login);
router.get('/me', authenticate, getMe);
router.post('/register', authenticate, authorize(['admin']), registerStaff);

export default router;
