"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jobFair_controller_1 = require("../controllers/jobFair.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const jobFair_validator_1 = require("../validators/jobFair.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
// Public listing and event details
router.get('/', jobFair_controller_1.JobFairController.listFairs);
router.get('/:id', jobFair_controller_1.JobFairController.getFair);
// Attendee registration
router.post('/:id/register', auth_middleware_1.authenticate, (0, validate_middleware_1.validateBody)(jobFair_validator_1.registerJobFairSchema), jobFair_controller_1.JobFairController.registerForFair);
// Admin-only event management
router.post('/', auth_middleware_1.authenticate, (0, role_middleware_1.authorize)('admin'), (0, validate_middleware_1.validateBody)(jobFair_validator_1.createJobFairSchema), jobFair_controller_1.JobFairController.createFair);
router.patch('/:id', auth_middleware_1.authenticate, (0, role_middleware_1.authorize)('admin'), (0, validate_middleware_1.validateBody)(jobFair_validator_1.updateJobFairSchema), jobFair_controller_1.JobFairController.updateFair);
router.delete('/:id', auth_middleware_1.authenticate, (0, role_middleware_1.authorize)('admin'), jobFair_controller_1.JobFairController.deleteFair);
router.get('/:id/registrations', auth_middleware_1.authenticate, (0, role_middleware_1.authorize)('admin'), jobFair_controller_1.JobFairController.getRegistrations);
exports.default = router;
