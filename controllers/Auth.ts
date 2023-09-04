import { Request,Response } from "express";
import UserModel from "../models/User";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const userRegister = async (request:Request,response:Response) => {

    const {email,password,name} = request.body;

    const user = await UserModel.findOne({email:email});

    if(user)
    {
        return response.status(200).json("user has already registered");
    }
    if (!validator.isEmail(email)) {
        console.log('invalid email')
    }

    if (validator.isEmpty(password) || !validator.isLength(password, { min: 5 })) {
        console.log('Password is to short');
    }
    bcrypt.hash(password, 12).then(hashpw => {
        console.log(email)

        const user = new UserModel({
            email: email,
            password: hashpw,
            name: name
        })


        return  user.save();
    }).then(user => {
        console.log(user);
        if (user) {
            const token = jwt.sign({
                userId: user._id.toString(),
                email: user.email
            }, 'somesupersecretsecret', { expiresIn: '1h' });
            return response.status(200).json({ email: user.email, lastName: user.lastName, name: user.name, token: token });
        }
    }).catch(error => {
        console.log(error);
    })
}

export {userRegister};