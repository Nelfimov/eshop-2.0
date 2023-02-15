import { NextFunction, Response, Request } from 'express';
import { Address, Order, User } from '../models/index.js';
import { issueToken } from '../configs/index.js';
import { getOrCreateOrder } from '../helpers/index.js';

/**
 * Get `Order` with `isOrdered = false` for current user.
 * If not present or user is not authorized, create new order.
 */
export async function getOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) throw new Error('User is not authorized');

    const order = await getOrCreateOrder(req.user._id.toString());

    const user = await User.findById(req.user._id).exec();
    if (!user) throw new Error('User not found');

    res.json({
      success: true,
      ...issueToken(user),
      order,
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

/**
 * Change order with admin priveleges.
 */
export async function changeOrderAddress(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const address = new Address({ ...req.body });
    await address.save();
    const order = await Order.findById(req.params.id).exec();
    if (!order) {
      return res.json({
        success: false,
        message: 'Order is false',
      });
    }
    order.address = address._id;
    await order.save();
    res.json({
      success: true,
      order,
    });
  } catch (err) {
    next(err);
  }
}

/**
 * Change order with admin priveleges.
 */
export async function changeOrderStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const order = await Order.findById(req.params.id).exec();
    if (!order) {
      return res.json({
        success: false,
        message: 'Order is false',
      });
    }
    order.isOrdered = !order.isOrdered;
    await order.save();
    res.json({
      success: true,
      order,
    });
  } catch (err) {
    next(err);
  }
}
