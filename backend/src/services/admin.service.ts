import { User } from '../models/User';
import { Job } from '../models/Job';
import { Application } from '../models/Application';
import { Company } from '../models/Company';
import { CounsellingRequest } from '../models/CounsellingRequest';
import { ContactMessage } from '../models/ContactMessage';
import { JobFair } from '../models/JobFair';
import { AppError } from '../utils/AppError';

export class AdminService {
  static async getPlatformStats() {
    const [
      totalUsers,
      jobSeekers,
      employers,
      activeJobs,
      totalApplications,
      verifiedCompanies,
      pendingCounselling,
      unreadContacts,
      upcomingFairs,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'jobseeker' }),
      User.countDocuments({ role: 'employer' }),
      Job.countDocuments({ status: 'active' }),
      Application.countDocuments(),
      Company.countDocuments({ isVerified: true }),
      CounsellingRequest.countDocuments({ status: 'pending' }),
      ContactMessage.countDocuments({ status: 'unread' }),
      JobFair.countDocuments({ status: 'upcoming' }),
    ]);

    return {
      totalUsers,
      jobSeekers,
      employers,
      activeJobs,
      totalApplications,
      verifiedCompanies,
      pendingCounselling,
      unreadContacts,
      upcomingFairs,
    };
  }

  static async listUsers(role?: string) {
    const filter: any = {};
    if (role) filter.role = role;
    return User.find(filter).select('-password').sort({ createdAt: -1 });
  }

  static async verifyEmployer(userId: string, isVerified: boolean) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found.', 404);
    }

    user.isVerified = isVerified;
    await user.save();

    if (user.company) {
      await Company.findByIdAndUpdate(user.company, { isVerified });
    }

    return user;
  }
}
