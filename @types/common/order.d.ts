import { Types } from 'mongoose';
import { Address, Payment, User } from './index.js';

export interface Order {
  _id: Types.ObjectId;
  user: Types.ObjectId | User;
  isOrdered: boolean;
  payment: Types.ObjectId | Payment;
  address: Types.ObjectId | Address;
  createdAt: Date;
  updatedAt: Date;
}
