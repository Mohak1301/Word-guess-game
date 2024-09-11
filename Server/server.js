import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express application
const app = express();

// Middleware to parse JSON requests
app.use(express.json());



app.use("/",(req,res)=>{
    res.send("<h1>Hello World</h1>")
})

// Define the port
const PORT = process.env.PORT;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.bgGreen.white);
});