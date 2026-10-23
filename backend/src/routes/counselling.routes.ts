import { Router } from 'express';
import { CounsellingController } from '../controllers/counselling.controller';
import { validateBody } from '../middleware/validate.middleware';
import {
  createCounsellingSchema,
  updateCounsellingStatusSchema,
} from '../validators/counselling.validator';
import { authenticate, optionalAuthenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/role.middleware';

const router = Router();

// Submit counselling request (public or logged-in)
router.post(
  '/',
  optionalAuthenticate,
  validateBody(createCounsellingSchema),
  CounsellingController.submitRequest
);

// Protected admin review of counselling bookings
router.get('/', authenticate, authorize('admin'), CounsellingController.listRequests);

router.patch(
  '/:id/status',
  authenticate,
  authorize('admin'),
  validateBody(updateCounsellingStatusSchema),
  CounsellingController.updateStatus
);

export default router;
