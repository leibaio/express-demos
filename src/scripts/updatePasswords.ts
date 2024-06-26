import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/user';

const saltRounds = 10;
const MONGO_URI = 'mongodb://localhost:27017/reactDemos'; // 替换为你的MongoDB URI

// 连接到MongoDB
mongoose.connect(MONGO_URI);

const updatePasswords = async () => {
  try {
    const users = await User.find();

    for (let user of users) {
      if (!user.password.startsWith('$2b$')) {  // 检查密码是否已经加密
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
        await user.save();
      }
    }

    console.log('All passwords have been updated');
  } catch (error) {
    console.error('Error updating passwords:', error);
  } finally {
    mongoose.disconnect();
  }
};

updatePasswords();