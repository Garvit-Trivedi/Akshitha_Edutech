"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const company_controller_1 = require("../controllers/company.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const company_validator_1 = require("../validators/company.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
// Public company directory
router.get('/', company_controller_1.CompanyController.listCompanies);
router.get('/:id', company_controller_1.CompanyController.getCompany);
// Authenticated employer updates their own company profile
router.patch('/mine', auth_middleware_1.authenticate, (0, role_middleware_1.authorize)('employer'), (0, validate_middleware_1.validateBody)(company_validator_1.updateCompanySchema), company_controller_1.CompanyController.updateMyCompany);
// Admin verification endpoint
router.patch('/:id/verify', auth_middleware_1.authenticate, (0, role_middleware_1.authorize)('admin'), (0, validate_middleware_1.validateBody)(company_validator_1.verifyCompanySchema), company_controller_1.CompanyController.verifyCompany);
exports.default = router;
