import { Request, Response, NextFunction } from 'express';
import { User } from '../models/index.js';

export async function isUserAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: 'You are not authorized',
    });
    return;
  }

  const user = await User.findById(req.user._id).exec();
  if (!user) {
    res.status(401).json({
      success: false,
      message: 'Admin only access',
    });
    return;
  }
  next();
}
