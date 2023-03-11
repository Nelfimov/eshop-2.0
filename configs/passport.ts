import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import passport from 'passport';
import {
  JwtFromRequestFunction,
  Strategy,
  VerifiedCallback,
} from 'passport-jwt';
import { User as IUser } from '../@types/common/index.js';
import { User } from '../models/user.js';
import * as dotenv from 'dotenv';
import { HydratedDocument } from 'mongoose';

dotenv.config();

const customPassport = passport;

const cookieExtractor: JwtFromRequestFunction = function (req) {
  return req && req.cookies ? req.cookies['token'] : null;
};

customPassport.use(
  'jwt',
  new Strategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    },
    (req: Request, payload: JwtPayload, done: VerifiedCallback) => {
      User.findById(
        payload.sub,
        (err: Error, result: HydratedDocument<IUser> | undefined) => {
          if (err) {
            return done(err, false);
          }
          if (result) {
            req.user = result;
            return done(null, result);
          }
          done(null, false);
        }
      );
    }
  )
);

/*
customPassport.use(
  'jwt-or-new',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    },
    async (req: Request, payload: JwtPayload, done: VerifiedCallback) => {
      try {
        const user = await User.findById(payload.sub).exec();
        if (user) {
          req.user = user;
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        done(err, false);
      }
    }
  )
);
*/

export { customPassport as passport };
