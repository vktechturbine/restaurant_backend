
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import {UserModel} from '../models/User';
import { NextFunction } from 'express';


const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "somesupersecretsecret",
};

const initializePassport = (passport:any) => {


passport.use(
  new JwtStrategy(opts, async (jwtPayload,next) => {
    console.log(jwtPayload);
    console.log("yes");
    try {
      const user = await UserModel.findOne({email:jwtPayload.email});
      
      if (!user) {
        return next(null, false);
      }

      
      return next(null, user);

    } catch (error) {
      return next(error, false);
    }
  })
);
}
export default initializePassport;
