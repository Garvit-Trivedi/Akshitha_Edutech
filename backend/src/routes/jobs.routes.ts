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

// Public listings
router.get('/', validateQuery(jobQuerySchema), JobController.listJobs);

// Employer: My Jobs (Defined before :id to prevent collision)
router.get(
  '/employer/my-jobs',
  authenticate,
  authorize('employer', 'admin'),
  JobController.getMyJobs
);
router.get(
  '/my-jobs',
  authenticate,
  authorize('employer', 'admin'),
  JobController.getMyJobs
);

// Specific job details
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

// Employer / Admin view applicants for a specific job
router.get(
  '/:id/applications',
  authenticate,
  authorize('employer', 'admin'),
  ApplicationController.getJobApplicationsForEmployer
);

export default router;
