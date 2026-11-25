import { Router } from 'express';
import {
  createReservation,
  getAllReservations,
  updateReservationStatus,
  getSlotAvailability,
} from '../controllers/reservationController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Public reservation routes
router.post('/', createReservation);
router.get('/availability', getSlotAvailability);

// Staff / Admin routes
router.get('/', authenticate, getAllReservations);
router.patch('/:id/status', authenticate, updateReservationStatus);

export default router;
