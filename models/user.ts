import { Schema, model } from 'mongoose';
import { User } from '../@types/common/user.js';

const UserSchema = new Schema<User>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = model('User', UserSchema);

export { User as User };
