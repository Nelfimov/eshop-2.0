import jwt from 'jsonwebtoken';
import { HydratedDocument } from 'mongoose';
import { User } from '../@types/common/index.js';

export function issueToken(user: HydratedDocument<User>) {
  const id = user._id;
  const expiresIn = '1d';

  const payload = {
    sub: id,
    iat: Date.now(),
  };

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('Secret cannot be read');
    return;
  }

  const signedToken = jwt.sign(payload, secret, { expiresIn });

  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
  };
}
