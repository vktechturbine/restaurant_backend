import { Request, Response } from "express";
import { UserModel } from "../models/User";
import AddToCart from "../models/Item";
import Cart from "../models/Cart";
const CartItem = async (request: Request, response: Response) => {
  const { email, name, price, quantity } = request.body;

  console.log(request.user);
  console.log(request.body);

  try {
    // Find the user by userId
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    // Create a new cart item
  

    // Check if the user already has a cart, if not, create one
    let cart = await Cart.findOne({ email: email });
    console.log(cart);

    if (!cart) {
      cart = await Cart.create({ userEmail: email, items: [] });
    }

    // Add the cart item to the user's cart
    await cart.items.push({name,price,quantity});

    // Save the cart
    await cart.save();

    response
      .status(201)
      .json({ message: "Item added to cart successfully", item: {name,price,quantity} });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    response.status(500).json({ error: "Internal server error" });
  }
};

export { CartItem };
