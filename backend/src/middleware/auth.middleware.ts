import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';
import { verifyToken, TokenPayload } from '../utils/jwt';
import { User, IUser } from '../models/User';
import { AppError } from '../utils/AppError';

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      tokenPayload?: TokenPayload;
    }
  }
}

export async function authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let token: string | undefined;

    // 1. Check HttpOnly cookie
    if (req.cookies && req.cookies[env.COOKIE_NAME]) {
      token = req.cookies[env.COOKIE_NAME];
    }
    // 2. Check Authorization header as fallback
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new AppError('Authentication required. Please log in to proceed.', 401);
    }

    // Verify token
    const decoded = verifyToken(token);
    req.tokenPayload = decoded;

    // Verify user still exists in database
    const user = await User.findById(decoded.userId).populate('company');
    if (!user) {
      throw new AppError('User belonging to this token no longer exists.', 401);
    }

    req.user = user;
    next();
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      next(new AppError('Invalid authentication token. Please log in again.', 401));
      return;
    }
    if (error.name === 'TokenExpiredError') {
      next(new AppError('Your session has expired. Please log in again.', 401));
      return;
    }
    next(error);
  }
}

export async function optionalAuthenticate(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let token: string | undefined;
    if (req.cookies && req.cookies[env.COOKIE_NAME]) {
      token = req.cookies[env.COOKIE_NAME];
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      const decoded = verifyToken(token);
      req.tokenPayload = decoded;
      const user = await User.findById(decoded.userId).populate('company');
      if (user) {
        req.user = user;
      }
    }
    next();
  } catch {
    // Silently continue for optional authentication
    next();
  }
}
