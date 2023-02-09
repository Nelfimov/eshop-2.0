import { Schema, model, Types } from 'mongoose';
import { OrderItem } from '../@types/common/index.js';

const OrderItemSchema = new Schema<OrderItem>({
  product: { type: Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  order: { type: Types.ObjectId, ref: 'Order' },
});

const OrderItem = model('OrderItem', OrderItemSchema);

export { OrderItem };
