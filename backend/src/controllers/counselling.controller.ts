import { Request, Response, NextFunction } from 'express';
import { CounsellingService } from '../services/counselling.service';

export class CounsellingController {
  static async submitRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user ? req.user._id.toString() : undefined;
      const request = await CounsellingService.submitRequest(req.body, userId);
      res.status(201).json({
        success: true,
        message: 'Your career counselling request has been received. Our team will contact you.',
        data: { request },
      });
    } catch (error) {
      next(error);
    }
  }

  static async listRequests(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const requests = await CounsellingService.listRequests(req.query.status as string);
      res.status(200).json({
        success: true,
        count: requests.length,
        data: requests,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const request = await CounsellingService.updateStatus(req.params.id, req.body.status);
      res.status(200).json({
        success: true,
        message: 'Counselling request status updated',
        data: { request },
      });
    } catch (error) {
      next(error);
    }
  }
}
