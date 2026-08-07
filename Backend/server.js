// import { GoogleGenAI } from "@google/genai";
// import "dotenv/config";

// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY,
// });

// const response = await ai.models.generateContent({
//   model: "gemini-3.5-flash",
//   contents: "Difference between AI and ML",
// });

// console.log(response.text);

import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};





// app.post("/test", async (req, res) => {
//     // 1. Extract the prompt from the incoming request body
//     const { prompt } = req.body;

//     // 2. Validate that a prompt was actually provided
//     if (!prompt) {
//         return res.status(400).json({ error: "Please provide a 'prompt' in the request body." });
//     }

//     const apiKey = process.env.GEMINI_API_KEY; 
//     const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;

//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             contents: [
//                 {
//                     parts: [
//                         { text: prompt } // 3. Insert the dynamic prompt here
//                     ]
//                 }
//             ]
//         })
//     };

//    try {
//         const response = await fetch(url, options);
//         const data = await response.json(); 
        
//         // Extract just the generated text from the response structure
//         const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

//         // Return a clean response
//         res.json({
//             success: true,
//             text: generatedText
//         });
//     } catch(err) {
//         console.log(err);
//         res.status(500).json({ error: "Error generating content" });
//     }
// });