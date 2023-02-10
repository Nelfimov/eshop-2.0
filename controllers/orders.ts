import { NextFunction, Response, Request } from 'express';
import { Order } from '../models/order.js';

export async function getOrCreateOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) {
      return res.json({
        success: false,
        message: 'user is not authorized',
      });
    }

    const order = await Order.findOne({ user: req.user._id }).exec();
    if (order) {
      return res.json({
        success: true,
        user: req.user,
        order,
      });
    }

    const newOrder = new Order({
      user: req.user._id,
    });
    await newOrder.save();
    res.json({
      success: true,
      user: req.user,
      order: newOrder,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

export async function deleteOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const order = await Order.deleteOne({ _id: req.params.id });
    order.deletedCount === 1
      ? res.json({ success: true })
      : res.json({ success: false });
  } catch (err) {
    console.error(err);
    next(err);
  }
}
