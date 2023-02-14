import { Order } from '../models/order.js';

export async function getOrCreateOrder(id: string) {
  let order = await Order.findOne({ user: id, isOrdered: false }).exec();
  if (!order) {
    order = new Order({
      user: id,
    });
    await order.save();
  }
  return order;
}
