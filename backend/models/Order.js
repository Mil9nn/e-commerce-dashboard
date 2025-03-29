import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customerName: String,
    totalAmount: Number,
    status: { type: String, default: "Pending" },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: Number,
        }
    ],
});

export default mongoose.model("Order", orderSchema);
