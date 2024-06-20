import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  sex: String
  // 更多字段...
});

const User = mongoose.model('User', userSchema, 'users');
export default User;