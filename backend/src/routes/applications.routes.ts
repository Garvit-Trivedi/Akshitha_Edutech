import { Router } from 'express';
import { ApplicationController } from '../controllers/application.controller';
import { validateBody } from '../middleware/validate.middleware';
import { updateApplicationStatusSchema } from '../validators/application.validator';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/role.middleware';

const router = Router();

// Job seeker view their own applications
router.get(
  '/mine',
  authenticate,
  authorize('jobseeker', 'admin'),
  ApplicationController.getMyApplications
);

// Update status of an application
router.patch(
  '/:id/status',
  authenticate,
  authorize('employer', 'admin'),
  validateBody(updateApplicationStatusSchema),
  ApplicationController.updateStatus
);

export default router;
