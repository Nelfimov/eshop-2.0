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

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const product = new Product({ ...req.body });
    await product.save();
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function deleteOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await Product.deleteOne({ id: req.params.id }).exec();
    if (result.acknowledged) {
      res.json({
        success: true,
      });
      return;
    }
    res.json({
      success: false,
      message: 'Product not found',
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function updateOne(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const product = await Product.findById(req.params.id).exec();
    if (!product) {
      res.json({
        success: false,
        message: 'No such product found',
      });
      return;
    }
    product.set({ ...req.body });
    await product.save();
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
