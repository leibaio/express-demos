import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: Number,
  sex: String,
  // 更多字段...
});

const User = mongoose.model('User', userSchema, 'users');
export default User;