import { Schema, model, Types } from 'mongoose';

const OrderSchema = new Schema(
  {
    user: { type: Types.ObjectId, required: true },
    isOrdered: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

const Order = model('Order', OrderSchema);

export { Order };
