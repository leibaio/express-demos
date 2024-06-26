import express from 'express';
import cors from 'cors';
import userRoutes from './routes/useRoutes';
import connectDB from './config/db'; // 调整数据库连接逻辑的导入

const app = express();

app.use(cors({
  origin: ['http://localhost', 'http://localhost:8888'],
  methods: ['GET', 'POST'],
}));

// 连接到数据库
connectDB();

app.use(express.json());
// 使用路由
app.use('/api', userRoutes);

export default app;