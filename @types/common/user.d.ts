import { Types } from 'mongoose';

export interface User {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}
