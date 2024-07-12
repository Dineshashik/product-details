import express from "express";
import User from "../schema/index.js";
import Products from "../ProductSchema/index.js";
// import mongoose from "mongoose";
const router = express.Router();

router.use(express.json());
router.post("/login", async (req, res) => {
  const { mobileno, password, email } = req.body;

  if (email) {
    try {
      const user = await User.findOne({ password, email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      return res.json({ message: "Login successful", user });
    } catch (error) {
      return res.status(500).send({ message: "Internal server error" });
    }
  }
  if (mobileno) {
    try {
      const user = await User.findOne({ password, mobileno });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      return res.json({ message: "Login successful", user });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(400).send({ message: "Email is required" });
  }
});

router.post("/register", async (req, res) => {
  const { email, mobileno, password, username } = req.body;

  let user = await User.findOne({ $or: [{ email }, { mobileno }] });
  if (user) {
    return res
      .status(401)
      .json({ message: "Account already exists, Please go to login" });
  }
  user = await User({ username, password, email, mobileno });
  user.save();

  res.send({ message: "Registration successful", user });
});

export default router;

router.post("/products", async (req, res) => {
  try {
    const { name, price, quantity, brand, tax } = req.body;
    let product = await Products.findOne({ name });
    if (product) {
      return res.status(401).send({
        message: "Product already exists, Please add another Product",
      });
    }
    product = await Products({ name, price, quantity, brand, tax });
    product.save();
    res.status(200).send({ message: "data stored successful", data: product });
  } catch (error) {
    res.status(500).send({ message: "Error fetching users", error });
  }
});

router.get("/products", async (req, res) => {
  try {
    const limitValue = parseInt(req.query.limit) || 4;
    const page = parseInt(req.query.page) || 1;
    const name = req.query.name;
    const skipValue = (page - 1) * limitValue;
    let query = {};
    if (name) {
      query.name = new RegExp(name, "i");
    }
    const totalCount = await Products.countDocuments(query);
    const products = await Products.find(query)
      .skip(skipValue)
      .limit(limitValue);
    res.status(200).json({
      message: "Products fetched successfully",
      data: products,
      totalPages: Math.ceil(totalCount / limitValue),
      currentPage: page,
      totalItems: totalCount,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({ message: "Error fetching products", error });
  }
});

router.delete("/products/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const product = await Products.findOne({ name });

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    await Products.deleteOne({ name });
    res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting product", error });
  }
});

router.put("/products/:name", async (req, res) => {
  try {
    const { name, price, quantity, brand, tax } = req.body;

    let product = await Products.findOne({ name });
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    product.name = name || product.name;
    product.price = price || product.price;
    product.quantity = quantity || product.quantity;
    product.brand = brand || product.brand;
    product.tax = tax || product.tax;

    await product.save();

    res
      .status(200)
      .send({ message: "Product updated successfully", data: product });
  } catch (error) {
    res.status(500).send({ message: "Error updating product", error });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ message: "getAllDetails", users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

router.get("/alluserdetail", async (req, res) => {
  try {
    const limitValue = parseInt(req.query.limit) || 3;
    const page = parseInt(req.query.page) || 1;
    const username = req.query.username;
    const skipValue = (page - 1) * limitValue;
    let query = {};
    if (username) {
      query.name = new RegExp(username, "i");
    }
    const totalCount = await User.countDocuments(query);
    const users = await User.find(query).skip(skipValue).limit(limitValue);
    res.status(200).json({
      message: "Products fetched successfully",
      data: users,
      totalPages: Math.ceil(totalCount / limitValue),
      currentPage: page,
      totalItems: totalCount,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({ message: "Error fetching products", error });
  }
});

router.put("/users/:name", async (req, res) => {
  try {
    const { username, email, mobileno, password } = req.body;

    let user = await Products.findOne({username });
    if (!user) {
      return res.status(404).send({ message: "Product not found" });
    }
    user.username =username || user.username ;
    user.email = email || user.email;
    user.mobileno = mobileno || user.mobileno;
    user.password =password || user.password;
    

    await user.save();

    res
      .status(200)
      .send({ message: "Product updated successfully", data: user });
  } catch (error) {
    res.status(500).send({ message: "Error updating product", error });
  }
});

router.delete("/users/:name", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await Products.findOne({ username });

    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }
    await Products.deleteOne({ username });
    res.status(200).send({ message: "user deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting user", error });
  }
});
