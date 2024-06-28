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
    return res.status(400).json({
      code: 400,
      msg: 'Email already in use',
      data: null, // 根据需要可省略data字段
    });
  }

  // 加密密码
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    // 创建新用户
    const user = new User({ name, email, password: hashedPassword, age, sex });
    await user.save();

    res.status(201).json({
      code: 201,
      msg: 'User created successfully',
      data: null, // 根据需要可省略data字段
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      msg: 'Error creating user',
      data: null, // 根据需要可省略data字段
    });
  }
});

// 登录
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 检查用户是否存在
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        code: 404,
        msg: 'User not found',
        data: null,
      });
    }

    // 比较密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        code: 400,
        msg: 'Invalid credentials',
        data: null,
      });
    }

    // 生成JWT
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({
      code: 200,
      msg: 'Login successful',
      data: { token: token, expiresIn: '1h' },
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      msg: 'Error logging in',
      data: null,
    });
  }
});

// 获取用户列表
router.get('/getUserList', async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      code: 200,
      msg: 'Success',
      data: users,
    });
  } catch (error) {
    console.error(error); // 用于服务器端记录错误
    res.status(500).json({
      code: 500,
      msg: 'Internal Server Error',
      data: null, // 根据需要可省略data字段
    });
  }
});

export default router;