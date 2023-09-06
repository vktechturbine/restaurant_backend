import { MongoClient } from "mongodb";


import cors from 'cors';

import express from 'express';
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import userRouter from './routes/Auth';
import cartRouter from './routes/Cart';
import passport from "passport";
import  initializePassport  from "./config/Passport";
import productRoute from './routes/Item';

const app = express();
app.use(cors());
app.use(bodyParser.json());
initializePassport(passport);

app.use('/product',productRoute);
app.use('/user',userRouter);
app.use('/user/cart',cartRouter);

mongoose.connect("mongodb+srv://Vishalrk:Vishalrk12@cluster0.nl1tgvo.mongodb.net/restuarants").then(result => {
    console.log("Connected");
    
    app.listen(3001);
}).catch(error => {
    console.log("Not Connected");
})






