/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFunction, Response, Request } from 'express';
import { Order, OrderItem, Product, User } from '../models/index.js';
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
    const order = await getOrCreateOrder(req.user?.id);

    const user = await User.findById(req.user?._id).exec();
    if (!user) {
      return res.json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
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
    res.json({
      success: order.acknowledged,
      deletedCount: order.deletedCount,
    });
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
 * Change order to `ordered`.
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
    order.isOrdered = true;
    await order.save();
    res.json({
      success: true,
      order,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateAddress(
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
    if (req.body.shippingAddress) {
      order.addressShipping = req.body.shippingAddress;
    }
    if (req.body.billingAddress) {
      order.addressBilling = req.body.billingAddress;
    }
    await order.save();
    res.json({
      success: true,
      order,
    });
  } catch (err) {
    next(err);
  }
}

export async function updatePayment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let order = await Order.findById(req.params.id).exec();
    if (!order) {
      return res.json({
        success: false,
        message: 'Order is false',
      });
    }
    if (req.body.paymentID) {
      order.payment = req.body.paymentID;
    }
    await order.save();
    order = await Order.findById(req.params.id).populate('payment').exec();
    res.json({
      success: true,
      order,
    });
  } catch (err) {
    next(err);
  }
}

export async function addItems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let result = true;

    const cartItems: { id: string; quantity: string }[] = req.body.cartItems;
    const order = await getOrCreateOrder(req.user!._id.toString());

    for (const item of cartItems) {
      const product = await Product.findById(item.id).exec();
      if (!product) {
        result = false;
        break;
      }
      await new OrderItem({
        order,
        product,
        quantity: item.quantity,
      }).save();
    }

    if (!result) {
      return res.json({
        success: result,
        message: 'Something went wrong with items',
      });
    }

    const orderItems = await OrderItem.find({ order: order._id })
      .populate('order')
      .exec();
    res.json({
      success: result,
      order,
      orderItems,
    });
  } catch (err) {
    next(err);
  }
}
