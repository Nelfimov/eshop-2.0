import { NextFunction, Request, Response } from 'express';
import { Order } from '../models/index.js';

export async function getAllOrdersAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const orders = await Order.find().exec();

    return res.json({
      success: true,
      orders,
    });
  } catch (err) {
    next(err);
  }
}
