"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const jobs_routes_1 = __importDefault(require("./jobs.routes"));
const applications_routes_1 = __importDefault(require("./applications.routes"));
const companies_routes_1 = __importDefault(require("./companies.routes"));
const counselling_routes_1 = __importDefault(require("./counselling.routes"));
const contact_routes_1 = __importDefault(require("./contact.routes"));
const jobFairs_routes_1 = __importDefault(require("./jobFairs.routes"));
const admin_routes_1 = __importDefault(require("./admin.routes"));
const application_controller_1 = require("../controllers/application.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
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
router.use('/auth', auth_routes_1.default);
router.use('/jobs', jobs_routes_1.default);
router.use('/applications', applications_routes_1.default);
router.use('/companies', companies_routes_1.default);
router.use('/counselling-requests', counselling_routes_1.default);
router.use('/contact', contact_routes_1.default);
router.use('/job-fairs', jobFairs_routes_1.default);
router.use('/admin', admin_routes_1.default);
// Dedicated route requested in spec: GET /api/v1/employer/jobs/:id/applications
router.get('/employer/jobs/:id/applications', auth_middleware_1.authenticate, (0, role_middleware_1.authorize)('employer', 'admin'), application_controller_1.ApplicationController.getJobApplicationsForEmployer);
exports.default = router;
