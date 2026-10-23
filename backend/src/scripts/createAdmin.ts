import mongoose from 'mongoose';
import { connectDB } from '../config/db';
import { env } from '../config/env';
import { User } from '../models/User';
import { normalizeEmail, normalizePhone } from '../utils/normalize';

async function createAdmin() {
  try {
    console.log('[Script] Connecting to MongoDB...');
    await connectDB();

    const email = normalizeEmail(env.ADMIN_EMAIL);
    const phone = normalizePhone(env.ADMIN_PHONE);
    const password = env.ADMIN_PASSWORD;
    const name = env.ADMIN_NAME;

    if (!email || !password) {
      console.error('[Error] ADMIN_EMAIL and ADMIN_PASSWORD must be configured in .env');
      process.exit(1);
    }

    const existing = await User.findOne({ email });
    if (existing) {
      if (existing.role === 'admin') {
        console.log(`[Info] Admin user '${email}' already exists.`);
        process.exit(0);
      }
      existing.role = 'admin';
      existing.isVerified = true;
      await existing.save();
      console.log(`[Success] Updated existing user '${email}' to administrator role.`);
      process.exit(0);
    }

    const admin = new User({
      name,
      email,
      phone,
      password,
      role: 'admin',
      isVerified: true,
    });

    await admin.save();
    console.log('====================================================');
    console.log('🎉 Administrator account created successfully!');
    console.log(`👤 Name:  ${admin.name}`);
    console.log(`📧 Email: ${admin.email}`);
    console.log(`🔑 Role:  ${admin.role}`);
    console.log('====================================================');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('[Fatal Error] Failed to create administrator:', error);
    process.exit(1);
  }
}

createAdmin();
