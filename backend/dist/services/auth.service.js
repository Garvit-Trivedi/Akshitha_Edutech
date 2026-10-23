"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const User_1 = require("../models/User");
const Company_1 = require("../models/Company");
const AppError_1 = require("../utils/AppError");
const normalize_1 = require("../utils/normalize");
const jwt_1 = require("../utils/jwt");
class AuthService {
    static async register(input) {
        const email = (0, normalize_1.normalizeEmail)(input.email);
        const phone = (0, normalize_1.normalizePhone)(input.phone);
        // Verify email uniqueness
        const existing = await User_1.User.findOne({ email });
        if (existing) {
            throw new AppError_1.AppError('An account with this email address already exists.', 409);
        }
        // Prohibit public admin registration
        if (input.role === 'admin') {
            throw new AppError_1.AppError('Administrative registration is not allowed.', 403);
        }
        // Create user
        const user = new User_1.User({
            name: input.name.trim(),
            email,
            phone,
            password: input.password,
            role: input.role,
            isVerified: input.role === 'jobseeker', // Jobseekers are active, employers require admin verification
        });
        await user.save();
        // If role is employer, create initial Company record
        if (input.role === 'employer') {
            const company = await Company_1.Company.create({
                name: input.name.trim(),
                type: 'Employer',
                industry: 'General',
                location: 'India',
                description: `Company profile for ${input.name.trim()}`,
                owner: user._id,
                isVerified: false,
            });
            user.company = company._id;
            await user.save();
        }
        const token = (0, jwt_1.signToken)({
            userId: user._id.toString(),
            role: user.role,
            email: user.email,
        });
        return { user, token };
    }
    static async login(input) {
        const email = (0, normalize_1.normalizeEmail)(input.email);
        // Must explicitly select password since select: false
        const user = await User_1.User.findOne({ email }).select('+password').populate('company');
        if (!user) {
            throw new AppError_1.AppError('Invalid email or password.', 401);
        }
        const isMatch = await user.comparePassword(input.password);
        if (!isMatch) {
            throw new AppError_1.AppError('Invalid email or password.', 401);
        }
        const token = (0, jwt_1.signToken)({
            userId: user._id.toString(),
            role: user.role,
            email: user.email,
        });
        // Remove password before returning
        user.password = undefined;
        return { user, token };
    }
    static async getCurrentUser(userId) {
        const user = await User_1.User.findById(userId).populate('company');
        if (!user) {
            throw new AppError_1.AppError('User profile not found.', 404);
        }
        return user;
    }
}
exports.AuthService = AuthService;
