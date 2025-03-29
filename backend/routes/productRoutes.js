import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Add a product
router.post("/", async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
});

export default router;