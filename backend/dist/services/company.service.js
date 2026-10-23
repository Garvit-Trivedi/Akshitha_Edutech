"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Company_1 = require("../models/Company");
const Job_1 = require("../models/Job");
const AppError_1 = require("../utils/AppError");
class CompanyService {
    static async listCompanies(query) {
        const filter = {};
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
        const companies = await Company_1.Company.find(filter).sort({ openings: -1, createdAt: -1 });
        return companies;
    }
    static async getCompanyById(id) {
        const company = await Company_1.Company.findById(id);
        if (!company) {
            throw new AppError_1.AppError('Company profile not found.', 404);
        }
        const openJobs = await Job_1.Job.find({ owner: company.owner, status: 'active' }).sort({
            createdAt: -1,
        });
        return { company, openJobs };
    }
    static async updateMyCompany(employerId, input) {
        let company = await Company_1.Company.findOne({ owner: new mongoose_1.default.Types.ObjectId(employerId) });
        if (!company) {
            // If company record wasn't created yet, create it
            company = new Company_1.Company({
                ...input,
                owner: new mongoose_1.default.Types.ObjectId(employerId),
                isVerified: false,
            });
        }
        else {
            Object.assign(company, input);
        }
        await company.save();
        return company;
    }
    static async verifyCompany(companyId, isVerified) {
        const company = await Company_1.Company.findById(companyId);
        if (!company) {
            throw new AppError_1.AppError('Company not found.', 404);
        }
        company.isVerified = isVerified;
        await company.save();
        return company;
    }
}
exports.CompanyService = CompanyService;
