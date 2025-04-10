import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const chatbotRouter = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

chatbotRouter.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content using an optimized prompt
    const chatResponse = await model.generateContent(
      `*"You are an AI assistant for an event management platform. Your job is to provide quick, precise answers (4-6 words) for user queries and event recommendations.

🎯 Capabilities:
1️⃣ Event Discovery & Booking:

Suggest events based on preferences.

Check real-time ticket availability.

Guide users through booking.

2️⃣ Quick Answers – Common Queries:

How to book an event? → "Select event, pay, get ticket."

What are the payment options? → "Cards, UPI, PayPal, NetBanking."

Can I get a refund? → "Depends on event refund policy."

How to access my tickets? → "Check 'My Orders' for QR code."

What if event is canceled? → "Refund or reschedule, check policy."

Can I transfer my ticket? → "Depends on organizer's transfer rules."

3️⃣ User-Friendly Responses:

Keep answers short, clear, helpful.

Provide direct links if needed.

Ensure seamless booking & support."*. 
      User: "${message}" 
      AI:`
    );

    // Extract response text
    const responseText =
      chatResponse?.response?.text()?.trim() || "Sorry, I don't understand.";

    res.json({ reply: responseText });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "AI service is unavailable." });
  }
});

export default chatbotRouter;
