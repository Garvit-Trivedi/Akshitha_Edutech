import { Request, Response, NextFunction } from 'express';
import { CompanyService } from '../services/company.service';

export class CompanyController {
  static async listCompanies(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const companies = await CompanyService.listCompanies({
        q: req.query.q as string,
        industry: req.query.industry as string,
        verifiedOnly: req.query.all !== 'true',
      });
      res.status(200).json({
        success: true,
        count: companies.length,
        data: companies,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCompany(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { company, openJobs } = await CompanyService.getCompanyById(req.params.id);
      res.status(200).json({
        success: true,
        data: {
          company,
          openJobs,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateMyCompany(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const company = await CompanyService.updateMyCompany(
        req.user!._id.toString(),
        req.body
      );
      res.status(200).json({
        success: true,
        message: 'Company profile updated successfully',
        data: { company },
      });
    } catch (error) {
      next(error);
    }
  }

  static async verifyCompany(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const company = await CompanyService.verifyCompany(
        req.params.id,
        req.body.isVerified
      );
      res.status(200).json({
        success: true,
        message: `Company verification updated to ${req.body.isVerified}`,
        data: { company },
      });
    } catch (error) {
      next(error);
    }
  }
}
