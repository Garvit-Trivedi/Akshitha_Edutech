"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const counselling_controller_1 = require("../controllers/counselling.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const counselling_validator_1 = require("../validators/counselling.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
// Submit counselling request (public or logged-in)
router.post('/', auth_middleware_1.optionalAuthenticate, (0, validate_middleware_1.validateBody)(counselling_validator_1.createCounsellingSchema), counselling_controller_1.CounsellingController.submitRequest);
// Protected admin review of counselling bookings
router.get('/', auth_middleware_1.authenticate, (0, role_middleware_1.authorize)('admin'), counselling_controller_1.CounsellingController.listRequests);
router.patch('/:id/status', auth_middleware_1.authenticate, (0, role_middleware_1.authorize)('admin'), (0, validate_middleware_1.validateBody)(counselling_validator_1.updateCounsellingStatusSchema), counselling_controller_1.CounsellingController.updateStatus);
exports.default = router;
