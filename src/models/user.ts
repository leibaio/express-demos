import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  // 更多字段...
});

const User = mongoose.model('User', userSchema);
export default User;