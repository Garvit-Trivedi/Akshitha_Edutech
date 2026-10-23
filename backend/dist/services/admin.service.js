"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const User_1 = require("../models/User");
const Job_1 = require("../models/Job");
const Application_1 = require("../models/Application");
const Company_1 = require("../models/Company");
const CounsellingRequest_1 = require("../models/CounsellingRequest");
const ContactMessage_1 = require("../models/ContactMessage");
const JobFair_1 = require("../models/JobFair");
const AppError_1 = require("../utils/AppError");
class AdminService {
    static async getPlatformStats() {
        const [totalUsers, jobSeekers, employers, activeJobs, totalApplications, verifiedCompanies, pendingCounselling, unreadContacts, upcomingFairs,] = await Promise.all([
            User_1.User.countDocuments(),
            User_1.User.countDocuments({ role: 'jobseeker' }),
            User_1.User.countDocuments({ role: 'employer' }),
            Job_1.Job.countDocuments({ status: 'active' }),
            Application_1.Application.countDocuments(),
            Company_1.Company.countDocuments({ isVerified: true }),
            CounsellingRequest_1.CounsellingRequest.countDocuments({ status: 'pending' }),
            ContactMessage_1.ContactMessage.countDocuments({ status: 'unread' }),
            JobFair_1.JobFair.countDocuments({ status: 'upcoming' }),
        ]);
        return {
            totalUsers,
            jobSeekers,
            employers,
            activeJobs,
            totalApplications,
            verifiedCompanies,
            pendingCounselling,
            unreadContacts,
            upcomingFairs,
        };
    }
    static async listUsers(role) {
        const filter = {};
        if (role)
            filter.role = role;
        return User_1.User.find(filter).select('-password').sort({ createdAt: -1 });
    }
    static async verifyEmployer(userId, isVerified) {
        const user = await User_1.User.findById(userId);
        if (!user) {
            throw new AppError_1.AppError('User not found.', 404);
        }
        user.isVerified = isVerified;
        await user.save();
        if (user.company) {
            await Company_1.Company.findByIdAndUpdate(user.company, { isVerified });
        }
        return user;
    }
}
exports.AdminService = AdminService;
