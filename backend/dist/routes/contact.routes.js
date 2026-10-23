"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_controller_1 = require("../controllers/contact.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const contact_validator_1 = require("../validators/contact.validator");
const rateLimiter_middleware_1 = require("../middleware/rateLimiter.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
// Submit contact inquiry (rate limited)
router.post('/', rateLimiter_middleware_1.contactLimiter, (0, validate_middleware_1.validateBody)(contact_validator_1.createContactSchema), contact_controller_1.ContactController.submitMessage);
// Protected admin review of inquiries
router.get('/', auth_middleware_1.authenticate, (0, role_middleware_1.authorize)('admin'), contact_controller_1.ContactController.listMessages);
router.patch('/:id/status', auth_middleware_1.authenticate, (0, role_middleware_1.authorize)('admin'), (0, validate_middleware_1.validateBody)(contact_validator_1.updateContactStatusSchema), contact_controller_1.ContactController.updateStatus);
exports.default = router;
