import { Router } from 'express';
import authRoutes from './auth.routes';
import jobsRoutes from './jobs.routes';
import applicationsRoutes from './applications.routes';
import companiesRoutes from './companies.routes';
import counsellingRoutes from './counselling.routes';
import contactRoutes from './contact.routes';
import jobFairsRoutes from './jobFairs.routes';
import adminRoutes from './admin.routes';
import { ApplicationController } from '../controllers/application.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/role.middleware';

const router = Router();

// Root health check
router.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Akshitha Edutech Backend API',
    version: '1.0.0',
  });
});

// Primary resources
router.use('/auth', authRoutes);
router.use('/jobs', jobsRoutes);
router.use('/applications', applicationsRoutes);
router.use('/companies', companiesRoutes);
router.use('/counselling-requests', counsellingRoutes);
router.use('/contact', contactRoutes);
router.use('/job-fairs', jobFairsRoutes);
router.use('/admin', adminRoutes);

// Dedicated route requested in spec: GET /api/v1/employer/jobs/:id/applications
router.get(
  '/employer/jobs/:id/applications',
  authenticate,
  authorize('employer', 'admin'),
  ApplicationController.getJobApplicationsForEmployer
);

export default router;
