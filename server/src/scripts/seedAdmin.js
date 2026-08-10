import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.model.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in .env');
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    const adminEmail = 'bhanurjb21@gmail.com';
    const adminPassword = 'admin123';

    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      admin = new User({
        email: adminEmail,
        name: 'Admin',
      });
      admin.setPassword(adminPassword);
      await admin.save();
      console.log('Admin user seeded successfully');
    } else {
      console.log('Admin user already exists');
      // Update password just in case
      admin.setPassword(adminPassword);
      await admin.save();
      console.log('Admin user password updated');
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding admin: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
