import { NextFunction, Response, Request } from 'express';
import { Order } from '../models/order.js';
import { issueToken } from '../configs/index.js';
import { User } from '../models/user.js';

/**
 * Get `Order` with `isOrdered = false` for current user.
 * If not present or user is not authorized, create new order.
 */
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

    const user = await User.findById(req.user._id).exec();
    if (!user) {
      return res.json({
        success: false,
        message: 'Something went wrong: user not found',
      });
    }
    await newOrder.save();
    res.json({
      success: true,
      ...issueToken(user),
      order: newOrder,
    });
  } catch (err) {
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
    next(err);
  }
}

/**
 * Change order with admin priveleges.
 */
export async function changeOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let order = await Order.findById(req.params.id).exec();
    order = { ...order, ...req.body };
    if (!order) {
      return res.json({
        success: false,
        message: 'Order is false',
      });
    }
    await order?.save();
    res.json({
      success: true,
      order,
    });
  } catch (err) {
    next(err);
  }
}
