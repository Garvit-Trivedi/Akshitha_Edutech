import { Router } from 'express';
import { ContactController } from '../controllers/contact.controller';
import { validateBody } from '../middleware/validate.middleware';
import {
  createContactSchema,
  updateContactStatusSchema,
} from '../validators/contact.validator';
import { contactLimiter } from '../middleware/rateLimiter.middleware';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/role.middleware';

const router = Router();

// Submit contact inquiry (rate limited)
router.post('/', contactLimiter, validateBody(createContactSchema), ContactController.submitMessage);

// Protected admin review of inquiries
router.get('/', authenticate, authorize('admin'), ContactController.listMessages);

router.patch(
  '/:id/status',
  authenticate,
  authorize('admin'),
  validateBody(updateContactStatusSchema),
  ContactController.updateStatus
);

export default router;
