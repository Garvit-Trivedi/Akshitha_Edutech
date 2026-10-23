"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
const AppError_1 = require("../utils/AppError");
function authorize(...allowedRoles) {
    return (req, _res, next) => {
        if (!req.user) {
            next(new AppError_1.AppError('Unauthorized: Authentication required', 401));
            return;
        }
        if (!allowedRoles.includes(req.user.role)) {
            next(new AppError_1.AppError(`Forbidden: Role '${req.user.role}' is not authorized to access this resource`, 403));
            return;
        }
        next();
    };
}
