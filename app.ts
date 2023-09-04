import { MongoClient } from "mongodb";




import express from 'express';
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import userRouter from './routes/Auth';
const app = express();
app.use(bodyParser.json());
app.use('/user',userRouter);

mongoose.connect("mongodb+srv://Vishalrk:Vishalrk12@cluster0.nl1tgvo.mongodb.net/restuarants").then(result => {
    console.log("Connected");
    
    app.listen(3001);
}).catch(error => {
    console.log("Not Connected");
})






