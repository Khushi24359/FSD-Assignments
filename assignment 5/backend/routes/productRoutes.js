import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// ✅ Get all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ✅ Add product
router.post("/", async (req, res) => {
  const { name, price, image } = req.body;
  const product = new Product({ name, price, image });
  await product.save();
  res.json(product);
});

// ✅ Update product
router.put("/:id", async (req, res) => {
  const { name, price, image } = req.body;
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    { name, price, image },
    { new: true }
  );
  res.json(updated);
});

// ✅ Delete product
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

export default router;
