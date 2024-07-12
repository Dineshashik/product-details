import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: "string",
  },
  price: {
    type: "string",
  },
  quantity: {
    type: "string",
  },
  brand: {
    type: "string",
  },
  tax: {
    type: "string",
  },
});

const Products = mongoose.model("Product", ProductSchema);
export default Products;
