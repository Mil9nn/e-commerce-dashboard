import express from "express";
import Order from "../models/Order.js";
import { protect, admin } from "../middleware/auth.js";
import Product from "../models/Product.js";

const router = express.Router();

// Get all orders (admin sees all, staff see their own)
router.get("/", protect, async (req, res) => {
    try {
        const orders = await Order.find().populate("items.productId");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get single order
router.get("/:id", protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("items.productId");
        
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Create new order
router.post("/", protect, async (req, res) => {
    try {
        const { customerName, items } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No order items" });
        }

        // Calculate total and update stock
        let totalAmount = 0;
        for (const item of items) {
            const product = await Product.findById(item.productId);
            
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.productId}` });
            }
            
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Not enough stock for ${product.name}` });
            }
            
            totalAmount += product.price * item.quantity;
            
            // Update stock
            product.stock -= item.quantity;
            await product.save();
        }

        const order = new Order({
            customerName,
            items,
            totalAmount,
            status: "Pending"
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Update order status
router.put("/:id/status", protect, async (req, res) => {
    try {
        const { status } = req.body;
        
        const order = await Order.findById(req.params.id);
        
        if (order) {
            order.status = status || order.status;
            
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Get order statistics (admin only)
router.get("/stats/summary", protect, admin, async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const pendingOrders = await Order.countDocuments({ status: "Pending" });
        const totalRevenue = await Order.aggregate([
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]);
        
        res.json({
            totalOrders,
            pendingOrders,
            totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

export default router;