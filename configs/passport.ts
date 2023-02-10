import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import passport from 'passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { User as IUser } from '../@types/common/index.js';
import { User } from '../models/user.js';
import * as dotenv from 'dotenv';
import { HydratedDocument } from 'mongoose';
import { randomString } from '../helpers/random-string.js';

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
            return done(err, false);
          }
          if (result) {
            req.user = result;
            return done(null, result);
          } else {
            const user = new User({
              username: `anon-${randomString(10)}`,
              email: `.`,
              password: bcryptjs.hashSync(
                randomString(3),
                parseInt(process.env.SALT as string)
              ),
              isAnon: true,
            });
            user
              .save()
              .then((result) => {
                req.user = result;
                return done(null, result);
              })
              .catch((err: Error) => done(err, false));
          }
        }
      );
    }
  )
);

export { customPassport as passport };
