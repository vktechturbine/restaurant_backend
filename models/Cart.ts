import mongoose from "mongoose";
import Items from "./Item";

const itmes = Items.schema;

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
  },
      items: {type:[itmes]},
})

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;