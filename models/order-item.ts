import { Schema, model, Types } from 'mongoose';

const OrderItemSchema = new Schema({
  product: { type: Types.ObjectId, ref: 'Product' },
  quantity: { type: Number },
  order: { type: Types.ObjectId, ref: 'Order' },
});

const OrderItem = model('OrderItem', OrderItemSchema);

export { OrderItem };
