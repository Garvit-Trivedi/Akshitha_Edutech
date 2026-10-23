"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const jwt_1 = require("../utils/jwt");
class AuthController {
    static async register(req, res, next) {
        try {
            const { user, token } = await auth_service_1.AuthService.register(req.body);
            (0, jwt_1.setAuthCookie)(res, token);
            res.status(201).json({
                success: true,
                message: 'Account registered successfully',
                data: {
                    user,
                    token, // provided for clients that also use Authorization header
                },
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async login(req, res, next) {
        try {
            const { user, token } = await auth_service_1.AuthService.login(req.body);
            (0, jwt_1.setAuthCookie)(res, token);
            res.status(200).json({
                success: true,
                message: 'Signed in successfully',
                data: {
                    user,
                    token,
                },
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async logout(_req, res, next) {
        try {
            (0, jwt_1.clearAuthCookie)(res);
            res.status(200).json({
                success: true,
                message: 'Logged out successfully',
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getMe(req, res, next) {
        try {
            const user = await auth_service_1.AuthService.getCurrentUser(req.user._id.toString());
            res.status(200).json({
                success: true,
                data: {
                    user,
                },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
