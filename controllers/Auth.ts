import { Request, Response } from "express";
import {UserModel} from "../models/User";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userRegister = async (request: Request, response: Response) => {
  console.log(request.body);
  const { email, password, username } = request.body;

  const user = await UserModel.findOne({ email: email });

  if (user) {
    return response.status(200).json("user has already registered");
  }
  if (!validator.isEmail(email)) {
    console.log("invalid email");
  }

  if (
    validator.isEmpty(password) ||
    !validator.isLength(password, { min: 5 })
  ) {
    console.log("Password is to short");
  }
  bcrypt
    .hash(password, 12)
    .then((hashpw) => {
      console.log(email);

      const user = new UserModel({
        email: email,
        password: hashpw,
        name: username,
      });

      return user.save();
    })
    .then((user) => {
      console.log(user);
      if (user) {
        const token = jwt.sign(
          {
            userId: user._id.toString(),
            email: user.email,
          },
          "somesupersecretsecret",
          { expiresIn: "1h" }
        );
        return response.status(200).json({
          statusCode:200,
          data:{
            email: user.email,
          lastName: user.lastName,
          username: user.name,
          token: token
        },
        message:"User Registered Successfully"
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
const loginUser = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  var loadUser:any;
  const user = await UserModel.findOne({ email: email }).then((user) => {
    loadUser = user;
    if (!user) {
        response.status(200).json("user not found");
      }
      else{
        return bcrypt.compare(password,user?.password);
      }
     
  }).then((isEqual) => {
    if (!isEqual) {
        const error = new Error("Password is not match");
        
        response.status(422).json({ message: error.message });
        // throw error;
    }
    else {

        const token = jwt.sign({
            userId: loadUser._id.toString(),
            email: loadUser.email
        }, 'somesupersecretsecret');

        return response.status(200).json({ 
          statusCode:200,
          data:{email: loadUser.email, lastName: loadUser.lastName, name: loadUser.name, token: token },
          message:"user Login Successfully"
        });

    }
}).catch(error => {
    console.log(error);
})
  
  

  
};
export { userRegister, loginUser };
