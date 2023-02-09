import { ObjectId } from 'mongoose';

export interface Product {
  _id: ObjectId;
  name: string;
  quantityOnStock: number;
  price: number;
  deliveryPrice?: number;
  discount?: number;
  titleImage: string;
  subImages?: string[];
  createdAt: Date;
  updatedAt: Date;
  totalPrice?: number;
  decreaseStock?(number: number): number;
}
