import { User, IUser } from '../models/User';
import { Company } from '../models/Company';
import { RegisterInput, LoginInput } from '../validators/auth.validator';
import { AppError } from '../utils/AppError';
import { normalizeEmail, normalizePhone } from '../utils/normalize';
import { signToken } from '../utils/jwt';

export class AuthService {
  static async register(input: RegisterInput): Promise<{ user: IUser; token: string }> {
    const email = normalizeEmail(input.email);
    const phone = normalizePhone(input.phone);

    // Verify email uniqueness
    const existing = await User.findOne({ email });
    if (existing) {
      throw new AppError('An account with this email address already exists.', 409);
    }

    // Prohibit public admin registration
    if (input.role === ('admin' as any)) {
      throw new AppError('Administrative registration is not allowed.', 403);
    }

    // Create user
    const user = new User({
      name: input.name.trim(),
      email,
      phone,
      password: input.password,
      role: input.role,
      isVerified: input.role === 'jobseeker', // Jobseekers are active, employers require admin verification
    });

    await user.save();

    // If role is employer, create initial Company record
    if (input.role === 'employer') {
      const company = await Company.create({
        name: input.name.trim(),
        type: 'Employer',
        industry: 'General',
        location: 'India',
        description: `Company profile for ${input.name.trim()}`,
        owner: user._id,
        isVerified: false,
      });
      user.company = company._id;
      await user.save();
    }

    const token = signToken({
      userId: user._id.toString(),
      role: user.role,
      email: user.email,
    });

    return { user, token };
  }

  static async login(input: LoginInput): Promise<{ user: IUser; token: string }> {
    const email = normalizeEmail(input.email);

    // Must explicitly select password since select: false
    const user = await User.findOne({ email }).select('+password').populate('company');
    if (!user) {
      throw new AppError('Invalid email or password.', 401);
    }

    const isMatch = await user.comparePassword(input.password);
    if (!isMatch) {
      throw new AppError('Invalid email or password.', 401);
    }

    const token = signToken({
      userId: user._id.toString(),
      role: user.role,
      email: user.email,
    });

    // Remove password before returning
    user.password = undefined;

    return { user, token };
  }

  static async getCurrentUser(userId: string): Promise<IUser> {
    const user = await User.findById(userId).populate('company');
    if (!user) {
      throw new AppError('User profile not found.', 404);
    }
    return user;
  }
}
