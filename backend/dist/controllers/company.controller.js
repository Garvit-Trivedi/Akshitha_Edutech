"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const company_service_1 = require("../services/company.service");
class CompanyController {
    static async listCompanies(req, res, next) {
        try {
            const companies = await company_service_1.CompanyService.listCompanies({
                q: req.query.q,
                industry: req.query.industry,
                verifiedOnly: req.query.all !== 'true',
            });
            res.status(200).json({
                success: true,
                count: companies.length,
                data: companies,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getCompany(req, res, next) {
        try {
            const { company, openJobs } = await company_service_1.CompanyService.getCompanyById(req.params.id);
            res.status(200).json({
                success: true,
                data: {
                    company,
                    openJobs,
                },
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async updateMyCompany(req, res, next) {
        try {
            const company = await company_service_1.CompanyService.updateMyCompany(req.user._id.toString(), req.body);
            res.status(200).json({
                success: true,
                message: 'Company profile updated successfully',
                data: { company },
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async verifyCompany(req, res, next) {
        try {
            const company = await company_service_1.CompanyService.verifyCompany(req.params.id, req.body.isVerified);
            res.status(200).json({
                success: true,
                message: `Company verification updated to ${req.body.isVerified}`,
                data: { company },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CompanyController = CompanyController;
