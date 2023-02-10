import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import passport from 'passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { User as IUser } from '../@types/common/index.js';
import { User } from '../models/user.js';
import * as dotenv from 'dotenv';

dotenv.config();

const customPassport = passport;

customPassport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    },
    (req: Request, payload: JwtPayload, done: VerifiedCallback) => {
      User.findById(payload.sub, (err: Error, result: IUser | null) => {
        if (err) {
          done(err, false);
          return;
        }
        if (result) {
          req.user = result;
          done(null, result);
          return;
        }

        // TODO: добавить возможность создания пользователя если не найден.

        done(null, false);
      });
    }
  )
);

export { customPassport as passport };
