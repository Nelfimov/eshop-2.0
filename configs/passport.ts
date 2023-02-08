import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import passport from 'passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { User as IUser } from '../@types/common/index.js';
import { User } from '../models/user.js';

const customPassport = passport;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  passReqToCallback: true,
};

customPassport.use(
  new Strategy(
    opts,
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

        done(null, false);
      });
    }
  )
);

export { customPassport as passport };
