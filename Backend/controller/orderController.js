import { CurrencyCodes } from "validator/lib/isISO4217.js";
import orderModel from "../Models/orderModel.js";
import userModel from "../Models/userModel.js";
import Stripe from "stripe";
import jwt from "jsonwebtoken";

const stripe = new Stripe(process.env.Stripe_Secret_Key);

// Place the user order
const placeOrder = async (req, res) => {
  const frontendUrl = "http://localhost:5173";

  console.log("Received order request:", req.body); // Log the received order data

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Prepare items for Stripe payment link
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.title,
          description: item.description || "", // Use description if available
        },
        unit_amount: item.price * 100, // Price in paise (multiply by 100 for INR)
      },
      quantity: item.quantity,
    }));

    // Add delivery charges in paise
    const deliveryCharge = 2 * 100; // Delivery charges in paise (2 INR)
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge, // Delivery charges
      },
      quantity: 1,
    });

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
    });

    // Send session URL to the frontend
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error placing order:", error); // Log the error for debugging
    res.status(400).json({ success: false, message: "Error placing order" });
  }
};

// verify order...
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// userorders for frontend....
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.user.id });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder, userOrders };
