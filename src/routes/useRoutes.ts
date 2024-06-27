import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const router = express.Router();
const SECRET_KEY = '这里替换为你的密钥';
const saltRounds = 10;

// 注册
router.post('/register', async (req, res) => {
  const { name, email, password, age, sex } = req.body;

  // 检查用户是否已存在
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: 'Email already in use' });
  }

  // 加密密码
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    // 创建新用户
    const user = new User({
      name,
      email,
      password: hashedPassword,
      age,
      sex,
    });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// 登录
router.post('/login', async (req, res) => {
  console.log('[ req.body ] >', req.body)
  const { email, password } = req.body;

  try {
    // 检查用户是否存在
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 比较密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 生成JWT
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token, message: 'success' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

// 获取用户列表的路由
router.get('/getUserList', async (req: Request, res: Response) => {
  try {
    // 使用mongoose的find方法查询所有用户
    const users = await User.find({});

    // 成功响应
    res.status(200).json({
      code: 200,
      msg: 'Success',
      data: users,
    });
  } catch (error) {
    // 错误处理
    console.error(error); // 用于服务器端记录错误
    res.status(500).json({
      code: 500,
      msg: 'Internal Server Error',
      error: error,
    });
  }
});

export default router;