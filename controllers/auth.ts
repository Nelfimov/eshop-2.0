import { NextFunction, Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { User } from '../models/user.js';
import { issueToken } from '../configs/jwt.js';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password }: { [field: string]: string | undefined } =
      req.body;

    if (!password) {
      return res.json({
        success: false,
        message: 'You need to provide password',
      });
    }

    if (!email) {
      return res.json({
        success: false,
        message: 'You need to provide email',
      });
    }

    const user = await User.findOne({ email, isAnon: false }).exec();
    if (!user) {
      return res.json({
        success: false,
        message: 'No such user found',
      });
    }

    const result = bcryptjs.compareSync(password, user.password);
    if (!result) {
      return res.json({
        success: false,
        message: 'Passwords do not match',
      });
    }

    const token = await issueToken(user);
    res.json({
      success: true,
      ...token,
      user: [user.username, user.email],
    });
  } catch (err) {
    next(err);
  }
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password, secret }: { [field: string]: string | undefined } =
      req.body;
    if (!password) {
      return res.json({
        success: false,
        message: 'Need to provide password',
      });
    }

    if (!email) {
      return res.json({
        success: false,
        message: 'Need to provide unique email',
      });
    }

    const userByEmail = await User.exists({
      email: { $regex: email, $options: 'i' },
    }).exec();

    if (userByEmail) {
      return res.json({
        success: false,
        message: 'Username or email already taken',
      });
    }

    const hashedPassword = bcryptjs.hashSync(
      password,
      parseInt(process.env.SALT as string)
    );
    const user = new User({
      email,
      password: hashedPassword,
      isAdmin: secret === process.env.ADMIN_SECRET,
    });
    await user.save();
    const token = await issueToken(user);
    res.json({
      success: true,
      ...token,
      user: [user.username, user.email],
    });
  } catch (err) {
    next(err);
  }
}
