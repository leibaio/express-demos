import express, { Request, Response } from 'express';
import cors from 'cors';

// TODO 连接 mongo

// 创建express应用
const app = express();

app.use(cors({
  origin: ['http://localhost', 'http://localhost:8888'],
  methods: ['GET', 'POST'], // 允许跨域请求的HTTP方法
}));

// 定义端口
const PORT = 3000;

// 定义基本路由
app.get('/api/getUserList', (req: Request, res: Response) => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
  ];

  // 使用统一的响应格式返回数据
  res.json({
    code: 200, // 代表请求成功
    msg: 'Success', // 请求成功的说明信息
    data: users, // 实际的用户列表数据
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});