import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  roles: {
    User: {
      type: String,
      default: '0001',
    },
    Admin: String,
  },
  refreshToken: [String],
  password: {
    type: String,
    require: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  lastActiveAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model('User', userSchema);

// ========================================================
// Exports
// ========================================================
export default User;
