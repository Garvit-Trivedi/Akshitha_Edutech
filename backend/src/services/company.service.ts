import mongoose from 'mongoose';
import { Company, ICompany } from '../models/Company';
import { Job } from '../models/Job';
import { UpdateCompanyInput } from '../validators/company.validator';
import { AppError } from '../utils/AppError';

export class CompanyService {
  static async listCompanies(query: { q?: string; industry?: string; verifiedOnly?: boolean }) {
    const filter: any = {};

    if (query.verifiedOnly !== false) {
      // By default list verified companies publicly
      filter.isVerified = true;
    }

    if (query.q) {
      filter.$or = [
        { name: { $regex: query.q, $options: 'i' } },
        { industry: { $regex: query.q, $options: 'i' } },
        { location: { $regex: query.q, $options: 'i' } },
        { description: { $regex: query.q, $options: 'i' } },
      ];
    }

    if (query.industry && query.industry !== 'All industries') {
      filter.industry = { $regex: new RegExp(`^${query.industry.trim()}$`, 'i') };
    }

    const companies = await Company.find(filter).sort({ openings: -1, createdAt: -1 });
    return companies;
  }

  static async getCompanyById(id: string): Promise<{ company: ICompany; openJobs: any[] }> {
    const company = await Company.findById(id);
    if (!company) {
      throw new AppError('Company profile not found.', 404);
    }

    const openJobs = await Job.find({ owner: company.owner, status: 'active' }).sort({
      createdAt: -1,
    });
    return { company, openJobs };
  }

  static async updateMyCompany(employerId: string, input: UpdateCompanyInput): Promise<ICompany> {
    let company = await Company.findOne({ owner: new mongoose.Types.ObjectId(employerId) });
    if (!company) {
      // If company record wasn't created yet, create it
      company = new Company({
        ...input,
        owner: new mongoose.Types.ObjectId(employerId),
        isVerified: false,
      });
    } else {
      Object.assign(company, input);
    }

    await company.save();
    return company;
  }

  static async verifyCompany(companyId: string, isVerified: boolean): Promise<ICompany> {
    const company = await Company.findById(companyId);
    if (!company) {
      throw new AppError('Company not found.', 404);
    }

    company.isVerified = isVerified;
    await company.save();
    return company;
  }
}
