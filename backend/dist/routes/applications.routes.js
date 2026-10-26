"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const application_controller_1 = require("../controllers/application.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const application_validator_1 = require("../validators/application.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
// Job seeker view their own applications
router.get('/mine', auth_middleware_1.authenticate, (0, role_middleware_1.authorize)('jobseeker', 'admin'), application_controller_1.ApplicationController.getMyApplications);
// View single application details (Authorized for applicant or job-owner employer)
router.get('/:id', auth_middleware_1.authenticate, application_controller_1.ApplicationController.getApplication);
// Update status of an application
router.patch('/:id/status', auth_middleware_1.authenticate, (0, role_middleware_1.authorize)('employer', 'admin'), (0, validate_middleware_1.validateBody)(application_validator_1.updateApplicationStatusSchema), application_controller_1.ApplicationController.updateStatus);
exports.default = router;
