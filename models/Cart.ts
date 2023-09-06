import mongoose from "mongoose";
import Items from "./Item";

const itmes = Items.schema;

const cartSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        require:true
      },
      items: {type:[itmes]},
})

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;