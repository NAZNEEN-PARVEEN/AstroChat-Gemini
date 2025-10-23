import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api", chatRoutes);
app.use("/api/auth", authRoutes);

///✅ Database connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected`);

        // 💡 FIX: Start server ONLY after successful DB connection
        app.listen(PORT, () => {
             console.log(` Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error(" Failed to connect with DB:", err.message);
        process.exit(1); // stop server if DB fails
    }
};

// ✅ FINAL STEP: Call the function to start the entire process
connectDB();
