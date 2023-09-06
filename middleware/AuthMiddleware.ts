import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import {IUser,UserModel} from '../models/User';
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  let token ;
  console.log(req.headers.authorization);
  if (req && req.headers.authorization) {
    token = req.headers.authorization;
  }
  console.log(token);
  return token;
   
};
export {authenticate};