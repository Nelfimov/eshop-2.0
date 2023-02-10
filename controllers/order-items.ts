import { NextFunction, Request, Response } from 'express';
import { OrderItem } from '../models/order-item.js';
import { Product } from '../models/product.js';

export async function addToCart(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).exec();
    if (!product) {
      res.json({
        success: false,
        messaage: 'Product with such ID does not exist.',
      });
      return;
    }

    // TODO create order

    const orderItem = new OrderItem({ product, quantity: 1 });
  } catch (err) {
    console.error(err);
    next(err);
  }
}
