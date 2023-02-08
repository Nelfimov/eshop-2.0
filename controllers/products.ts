import { NextFunction, Request, Response } from 'express';
import { Product } from '../models/index.js';

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const products = await Product.find({}).exec();
    res.json({
      success: true,
      products,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await Product.findById(req.params.id).exec();
    res.json({
      success: true,
      product,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
