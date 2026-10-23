import { Router } from 'express';
import { CompanyController } from '../controllers/company.controller';
import { validateBody } from '../middleware/validate.middleware';
import { updateCompanySchema, verifyCompanySchema } from '../validators/company.validator';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/role.middleware';

const router = Router();

// Public company directory
router.get('/', CompanyController.listCompanies);
router.get('/:id', CompanyController.getCompany);

// Authenticated employer updates their own company profile
router.patch(
  '/mine',
  authenticate,
  authorize('employer'),
  validateBody(updateCompanySchema),
  CompanyController.updateMyCompany
);

// Admin verification endpoint
router.patch(
  '/:id/verify',
  authenticate,
  authorize('admin'),
  validateBody(verifyCompanySchema),
  CompanyController.verifyCompany
);

export default router;
