import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js"; // Ensure this path is correct

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("Connected to MongoDB");

        // Hash the password
        const hashedPassword = await bcrypt.hash("123456", 10);

        // Create a test user
        const testUser = new User({
            name: "Test User",
            email: "test@example.com",
            password: hashedPassword,
            role: "staff" // Default role
        });

        await testUser.save();
        console.log("Test user inserted successfully!");

        mongoose.connection.close(); // Close connection
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
