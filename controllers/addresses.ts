import { NextFunction, Request, Response } from 'express';
import { Address } from '../models/address.js';

export async function getUserAddresses(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const addresses = await Address.find({ user: req.user?._id });
    res.json({
      success: true,
      addresses,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

export async function createNewAddress(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const address = new Address({ ...req.body });
    await address.save();
    res.json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}
