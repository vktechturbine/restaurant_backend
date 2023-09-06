import mongoose from "mongoose";


const  itemSchema= new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productImage:{
    type:String,
    require:true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  description:{
    type:String,
  },
  category:{
    type:String,
    require:true
  },
  subCategory:{
    type:String,
    require:true
  }
});
const Items = mongoose.model("Items", itemSchema);
export default Items;
