import { NextFunction, Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import { User } from '../models/user.js';
import { issueToken } from '../configs/jwt.js';

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      username,
      email,
      password,
    }: { [field: string]: string | undefined } = req.body;

    if (!password) {
      res.json({
        success: false,
        message: 'You need to provide password',
      });
      return;
    }

    if (!username && !email) {
      res.json({
        success: false,
        message: 'You need to provide either username or password',
      });
      return;
    }

    const user = await User.findOne({ $or: [{ username }, { email }] }).exec();
    if (!user) {
      res.json({
        success: false,
        message: 'No such user found',
      });
      return;
    }

    const result = bcryptjs.compareSync(password, user.password);
    if (!result) {
      res.json({
        success: false,
        message: 'Passwords do not match',
      });
      return;
    }

    const token = await issueToken(user);
    res.json({
      success: true,
      ...token,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      username,
      email,
      password,
      secret,
    }: { [field: string]: string | undefined } = req.body;

    if (!username) {
      res.json({
        success: false,
        message: 'Need to provide unique username',
      });
      return;
    }

    if (!password) {
      res.json({
        success: false,
        message: 'Need to provide password',
      });
      return;
    }

    if (!email) {
      res.json({
        success: false,
        message: 'Need to provide unique email',
      });
      return;
    }

    const userByUsernameOrEmail = await User.exists({
      $or: [
        {
          username: { $regex: username, $options: 'i' },
        },
        { email: { $regex: email, $options: 'i' } },
      ],
    }).exec();

    if (userByUsernameOrEmail) {
      res.json({
        success: false,
        message: 'Username or email already taken',
      });
      return;
    }

    const hashedPassword = bcryptjs.hashSync(
      password,
      parseInt(process.env.SALT as string)
    );
    let user;
    if (secret === process.env.ADMIN_SECRET) {
      user = new User({
        username,
        email,
        password: hashedPassword,
        isAdmin: true,
      });
    } else {
      user = new User({ username, email, password: hashedPassword });
    }
    await user.save();
    const token = await issueToken(user);
    res.json({
      success: true,
      ...token,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}
