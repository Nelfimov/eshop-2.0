import { NextFunction, Request, Response } from 'express';
import { Product } from '../models/index.js';

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const products = await Product.find().lean().exec();
    res.json({
      success: true,
      products,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
