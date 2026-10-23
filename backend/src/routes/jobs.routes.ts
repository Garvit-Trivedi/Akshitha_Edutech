import { Router } from 'express';
import { JobController } from '../controllers/job.controller';
import { ApplicationController } from '../controllers/application.controller';
import { validateBody, validateQuery } from '../middleware/validate.middleware';
import {
  createJobSchema,
  updateJobSchema,
  jobQuerySchema,
} from '../validators/job.validator';
import { createApplicationSchema } from '../validators/application.validator';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/role.middleware';
import { uploadResume } from '../middleware/upload.middleware';

const router = Router();

// Public listings and details
router.get('/', validateQuery(jobQuerySchema), JobController.listJobs);
router.get('/:id', JobController.getJob);

// Employer / Admin job posting & management
router.post(
  '/',
  authenticate,
  authorize('employer', 'admin'),
  validateBody(createJobSchema),
  JobController.createJob
);

router.patch(
  '/:id',
  authenticate,
  authorize('employer', 'admin'),
  validateBody(updateJobSchema),
  JobController.updateJob
);

router.delete(
  '/:id',
  authenticate,
  authorize('employer', 'admin'),
  JobController.closeJob
);

// Job seeker apply endpoint under /jobs/:id/applications
router.post(
  '/:id/applications',
  authenticate,
  authorize('jobseeker', 'admin'),
  uploadResume.single('resume'),
  validateBody(createApplicationSchema),
  ApplicationController.applyForJob
);

export default router;
