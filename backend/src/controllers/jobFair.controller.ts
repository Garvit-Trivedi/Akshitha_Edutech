import { Request, Response, NextFunction } from 'express';
import { JobFairService } from '../services/jobFair.service';

export class JobFairController {
  static async listFairs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const fairs = await JobFairService.listFairs({
        city: req.query.city as string,
        mode: req.query.mode as string,
      });
      res.status(200).json({
        success: true,
        count: fairs.length,
        data: fairs,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getFair(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const fair = await JobFairService.getFairByIdOrSlug(req.params.id);
      res.status(200).json({
        success: true,
        data: { fair },
      });
    } catch (error) {
      next(error);
    }
  }

  static async createFair(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const fair = await JobFairService.createFair(req.body);
      res.status(201).json({
        success: true,
        message: 'Job fair created successfully',
        data: { fair },
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateFair(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const fair = await JobFairService.updateFair(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: 'Job fair updated successfully',
        data: { fair },
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteFair(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await JobFairService.deleteFair(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Job fair deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  static async registerForFair(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const registration = await JobFairService.registerUser(
        req.params.id,
        req.user!._id.toString(),
        req.body
      );
      res.status(201).json({
        success: true,
        message: 'You have successfully registered for this job fair!',
        data: { registration },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getRegistrations(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const registrations = await JobFairService.getRegistrationsForFair(req.params.id);
      res.status(200).json({
        success: true,
        count: registrations.length,
        data: registrations,
      });
    } catch (error) {
      next(error);
    }
  }
}
