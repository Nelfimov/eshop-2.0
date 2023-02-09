import { Schema, model, Types } from 'mongoose';
import { Order } from '../@types/common/index.js';

const OrderSchema = new Schema<Order>(
  {
    user: { type: Types.ObjectId, required: true },
    isOrdered: { type: Boolean, default: false, required: true },
    payment: { type: Types.ObjectId, ref: 'Payment' },
    address: { type: Types.ObjectId, ref: 'Address', required: true },
  },
  {
    timestamps: true,
  }
);

const Order = model('Order', OrderSchema);

export { Order };
