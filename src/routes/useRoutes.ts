import express, { Request, Response } from 'express';
import User from '../models/user';

const router = express.Router();

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