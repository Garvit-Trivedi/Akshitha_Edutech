import { Request, Response, NextFunction } from 'express';
import { AdminService } from '../services/admin.service';

export class AdminController {
  static async getStats(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const stats = await AdminService.getPlatformStats();
      res.status(200).json({
        success: true,
        data: { stats },
      });
    } catch (error) {
      next(error);
    }
  }

  static async listUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await AdminService.listUsers(req.query.role as string);
      res.status(200).json({
        success: true,
        count: users.length,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  static async verifyEmployer(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const isVerified = req.body.isVerified !== false;
      const user = await AdminService.verifyEmployer(req.params.id, isVerified);
      res.status(200).json({
        success: true,
        message: `Employer verification status updated to ${isVerified}`,
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }
}
