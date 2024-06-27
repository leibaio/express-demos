import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/user';

const saltRounds = 10;
const MONGO_URI = 'mongodb://localhost:27017/reactDemos'; // 替换为你的MongoDB URI

// 连接到MongoDB
mongoose.connect(MONGO_URI);

const createAdminUser = async () => {
  try {
    const adminEmail = 'admin';
    const adminPassword = '123456';

    // 检查是否已经存在该管理员用户
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds)
    const newAdmin = new User({
      name: 'admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin'
    })

    await newAdmin.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    mongoose.disconnect();
  }
};

createAdminUser();