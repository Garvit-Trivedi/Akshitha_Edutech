"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
exports.optionalAuthenticate = optionalAuthenticate;
const env_1 = require("../config/env");
const jwt_1 = require("../utils/jwt");
const User_1 = require("../models/User");
const AppError_1 = require("../utils/AppError");
async function authenticate(req, res, next) {
    try {
        let token;
        // 1. Check HttpOnly cookie
        if (req.cookies && req.cookies[env_1.env.COOKIE_NAME]) {
            token = req.cookies[env_1.env.COOKIE_NAME];
        }
        // 2. Check Authorization header as fallback
        else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            throw new AppError_1.AppError('Authentication required. Please log in to proceed.', 401);
        }
        // Verify token
        const decoded = (0, jwt_1.verifyToken)(token);
        req.tokenPayload = decoded;
        // Verify user still exists in database
        const user = await User_1.User.findById(decoded.userId).populate('company');
        if (!user) {
            throw new AppError_1.AppError('User belonging to this token no longer exists.', 401);
        }
        req.user = user;
        next();
    }
    catch (error) {
        if (error.name === 'JsonWebTokenError') {
            next(new AppError_1.AppError('Invalid authentication token. Please log in again.', 401));
            return;
        }
        if (error.name === 'TokenExpiredError') {
            next(new AppError_1.AppError('Your session has expired. Please log in again.', 401));
            return;
        }
        next(error);
    }
}
async function optionalAuthenticate(req, _res, next) {
    try {
        let token;
        if (req.cookies && req.cookies[env_1.env.COOKIE_NAME]) {
            token = req.cookies[env_1.env.COOKIE_NAME];
        }
        else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (token) {
            const decoded = (0, jwt_1.verifyToken)(token);
            req.tokenPayload = decoded;
            const user = await User_1.User.findById(decoded.userId).populate('company');
            if (user) {
                req.user = user;
            }
        }
        next();
    }
    catch {
        // Silently continue for optional authentication
        next();
    }
}
