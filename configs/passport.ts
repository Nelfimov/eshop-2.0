import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import passport from 'passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { User as IUser } from '../@types/common/index.js';
import { User } from '../models/user.js';
import * as dotenv from 'dotenv';
import { HydratedDocument } from 'mongoose';

dotenv.config();

const customPassport = passport;

customPassport.use(
  'jwt',
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    },
    (req: Request, payload: JwtPayload, done: VerifiedCallback) => {
      User.findById(
        payload.sub,
        (err: Error, result: HydratedDocument<IUser> | undefined) => {
          if (err) {
            done(err, false);
            return;
          }
          if (result) {
            req.user = result;
            done(null, result);
            return;
          }
          done(null, false);
        }
      );
    }
  )
);

customPassport.use(
  'jwt-anon',
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    },
    (req: Request, payload: JwtPayload, done: VerifiedCallback) => {
      User.findById(
        payload.sub,
        (err: Error, result: HydratedDocument<IUser> | undefined) => {
          if (err) {
            done(err, false);
            return;
          }
          if (result) {
            req.user = result;
            done(null, result);
          } else {
          }
        }
      );
    }
  )
);

export { customPassport as passport };
