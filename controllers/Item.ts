import Items from "../models/Item";
import { Request, Response } from "express";

const addProduct = async (request: Request, response: Response) => {
  const {name, image, price, quantity,description,category,subCategory} = request.body;

    const item = await Items.create({
        productName:name,
        image:image,
        price:price,
        quantity:quantity,
        description:description,
        category:category,
        subCategory:subCategory

    })
    if(!item)
    {
        return response.status(500).json("there is an error to create");
    }
    return (
        response.status(200).json({
            statusCode:200,
            data:item,
            message:"Item is Created Successfully"
        })
  )
}

export  {addProduct};