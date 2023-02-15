import { Types } from 'mongoose';
import { Address, Payment, User } from './index.js';

export interface Order {
  user: Types.ObjectId | User;
  isOrdered: boolean;
  payment?: Types.ObjectId | Payment;
  address?: Types.ObjectId | Address;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
