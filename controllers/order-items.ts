import { NextFunction, Request, Response } from 'express';
import { Order, OrderItem, Product } from '../models/index.js';

export async function addToCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).exec();
    if (!product) {
      return res.json({
        success: false,
        message: 'Product with such ID does not exist.',
      });
    }

    // TODO create order

    const orderItem = new OrderItem({ product, quantity: 1 });
  } catch (err) {
    next(err);
  }
}
