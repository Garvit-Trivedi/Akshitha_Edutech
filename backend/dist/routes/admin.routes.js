"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
// All routes here strictly require admin authentication
router.use(auth_middleware_1.authenticate, (0, role_middleware_1.authorize)('admin'));
router.get('/stats', admin_controller_1.AdminController.getStats);
router.get('/users', admin_controller_1.AdminController.listUsers);
router.patch('/employers/:id/verify', admin_controller_1.AdminController.verifyEmployer);
exports.default = router;
