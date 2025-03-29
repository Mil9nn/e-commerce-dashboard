import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Get all orders
router.get("/", async (req, res) => {
    const orders = await Order.find().populate("items.productId");
    res.json(orders);
});

// Add an order
router.post("/", async (req, res) => {
    const order = new Order(req.body);
    await order.save();
    res.json(order);
});

export default router;
