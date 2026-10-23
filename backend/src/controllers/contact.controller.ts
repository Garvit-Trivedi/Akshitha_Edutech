import { Request, Response, NextFunction } from 'express';
import { ContactService } from '../services/contact.service';

export class ContactController {
  static async submitMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const contact = await ContactService.submitMessage(req.body);
      res.status(201).json({
        success: true,
        message: "Thank you for reaching out. We'll reply within one working day.",
        data: { contact },
      });
    } catch (error) {
      next(error);
    }
  }

  static async listMessages(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const messages = await ContactService.listMessages(req.query.status as string);
      res.status(200).json({
        success: true,
        count: messages.length,
        data: messages,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const message = await ContactService.updateStatus(req.params.id, req.body.status);
      res.status(200).json({
        success: true,
        message: 'Message status updated',
        data: { message },
      });
    } catch (error) {
      next(error);
    }
  }
}
