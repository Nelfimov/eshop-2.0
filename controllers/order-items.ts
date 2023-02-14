import { NextFunction, Request, Response } from 'express';
import { getOrCreateOrder } from '../helpers/index.js';
import { OrderItem, Product } from '../models/index.js';

export async function addToCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const product = await Product.findById(req.params.id).exec();
    if (!product) {
      return res.json({
        success: false,
        message: 'Product with such ID does not exist.',
      });
    }
    if (!req.user) {
      return res.json({
        success: false,
        message: 'User is not authorized',
      });
    }

    const order = await getOrCreateOrder(req.user._id.toString());

    const orderItem = new OrderItem({ product, quantity: 1, order: order._id });
    await orderItem.save();
    res.json({
      success: true,
      order,
      orderItem,
    });
  } catch (err) {
    next(err);
  }
}
