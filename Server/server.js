import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";  // Ensure the correct path for db.js
import authRoute from "./Routes/authRoute.js";  // Ensure the correct path for authRoute.js
import scoreRoute from "./Routes/scoreRoute.js";  // Ensure the correct path for scoreRoute.js
import cors from "cors";

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express application
const app = express();

// Middleware to parse JSON requests and handle CORS
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,  // Ensure CORS allows requests from your frontend
    methods: ["GET,POST,PUT,DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Define API routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/score", scoreRoute);
app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});

// Define the port from environment variables or use 5100 as a fallback
const PORT = process.env.PORT || 5100;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
