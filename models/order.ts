import { Schema, model } from 'mongoose';
import { Order as IOrder } from '../@types/common/index.js';

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, required: true },
    isOrdered: { type: Boolean, default: false, required: true },
    payment: { type: Schema.Types.ObjectId, ref: 'Payment' },
    address: { type: Schema.Types.ObjectId, ref: 'Address', required: true },
  },
  {
    timestamps: true,
  }
);

const Order = model<IOrder>('Order', OrderSchema);

export { Order };
