import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/role.middleware';

const router = Router();

// All routes here strictly require admin authentication
router.use(authenticate, authorize('admin'));

router.get('/stats', AdminController.getStats);
router.get('/users', AdminController.listUsers);
router.patch('/employers/:id/verify', AdminController.verifyEmployer);

export default router;
