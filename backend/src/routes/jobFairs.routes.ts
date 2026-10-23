import { Router } from 'express';
import { JobFairController } from '../controllers/jobFair.controller';
import { validateBody } from '../middleware/validate.middleware';
import {
  createJobFairSchema,
  updateJobFairSchema,
  registerJobFairSchema,
} from '../validators/jobFair.validator';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/role.middleware';

const router = Router();

// Public listing and event details
router.get('/', JobFairController.listFairs);
router.get('/:id', JobFairController.getFair);

// Attendee registration
router.post(
  '/:id/register',
  authenticate,
  validateBody(registerJobFairSchema),
  JobFairController.registerForFair
);

// Admin-only event management
router.post(
  '/',
  authenticate,
  authorize('admin'),
  validateBody(createJobFairSchema),
  JobFairController.createFair
);

router.patch(
  '/:id',
  authenticate,
  authorize('admin'),
  validateBody(updateJobFairSchema),
  JobFairController.updateFair
);

router.delete('/:id', authenticate, authorize('admin'), JobFairController.deleteFair);

router.get(
  '/:id/registrations',
  authenticate,
  authorize('admin'),
  JobFairController.getRegistrations
);

export default router;
