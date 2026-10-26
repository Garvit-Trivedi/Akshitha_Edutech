"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const job_controller_1 = require("../controllers/job.controller");
const application_controller_1 = require("../controllers/application.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const job_validator_1 = require("../validators/job.validator");
const application_validator_1 = require("../validators/application.validator");
const auth_middleware_1 = require("../middleware/auth.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const upload_middleware_1 = require("../middleware/upload.middleware");
const router = (0, express_1.Router)();
// Public listings
router.get('/', (0, validate_middleware_1.validateQuery)(job_validator_1.jobQuerySchema), job_controller_1.JobController.listJobs);
// Employer: My Jobs (Defined before :id to prevent collision)
router.get('/employer/my-jobs', auth_middleware_1.authenticate, (0, role_middleware_1.authorize)('employer', 'admin'), job_controller_1.JobController.getMyJobs);
router.get('/my-jobs', auth_middleware_1.authenticate, (0, role_middleware_1.authorize)('employer', 'admin'), job_controller_1.JobController.getMyJobs);
// Specific job details
router.get('/:id', job_controller_1.JobController.getJob);
// Employer / Admin job posting & management
router.post('/', auth_middleware_1.authenticate, (0, role_middleware_1.authorize)('employer', 'admin'), (0, validate_middleware_1.validateBody)(job_validator_1.createJobSchema), job_controller_1.JobController.createJob);
router.patch('/:id', auth_middleware_1.authenticate, (0, role_middleware_1.authorize)('employer', 'admin'), (0, validate_middleware_1.validateBody)(job_validator_1.updateJobSchema), job_controller_1.JobController.updateJob);
router.delete('/:id', auth_middleware_1.authenticate, (0, role_middleware_1.authorize)('employer', 'admin'), job_controller_1.JobController.closeJob);
// Job seeker apply endpoint under /jobs/:id/applications
router.post('/:id/applications', auth_middleware_1.authenticate, (0, role_middleware_1.authorize)('jobseeker', 'admin'), upload_middleware_1.uploadResume.single('resume'), (0, validate_middleware_1.validateBody)(application_validator_1.createApplicationSchema), application_controller_1.ApplicationController.applyForJob);
// Employer / Admin view applicants for a specific job
router.get('/:id/applications', auth_middleware_1.authenticate, (0, role_middleware_1.authorize)('employer', 'admin'), application_controller_1.ApplicationController.getJobApplicationsForEmployer);
exports.default = router;
