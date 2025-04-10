import { CurrencyCodes } from "validator/lib/isISO4217.js";
import orderModel from "../Models/orderModel.js";
import userModel from "../Models/userModel.js";
import Stripe from "stripe";
import jwt from "jsonwebtoken";
import QRCode from "qrcode";

const stripe = new Stripe(process.env.Stripe_Secret_Key);
const frontendUrl = "http://localhost:5173";

// Place the user order
const placeOrder = async (req, res) => {
  console.log("Received order request:", req.body);

  try {
    const { address, items, amount } = req.body; // Access the order data from req.body

    const newOrder = new orderModel({
      userId: req.user.id,
      items: items,
      amount: amount,
      address: address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.user.id, { cartData: {} });

    // Prepare items for Stripe payment link
    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.title,
          description: item.description || "",
        },
        unit_amount: item.price * 100, // Price in paise
      },
      quantity: item.quantity,
    }));

    // Add delivery charges
    const deliveryCharge = 2 * 100; // Delivery charges in paise
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge,
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

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(400).json({ success: false, message: "Error placing order" });
  }
};

// verify order...
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      const qrCodeData = `${frontendUrl}/order/${orderId}`;
      const qrCodeImage = await QRCode.toDataURL(qrCodeData);
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
        qrCode: qrCodeImage,
      });
      res.json({ success: true, message: "paid", qrCode: qrCodeImage });
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
  console.log("User ID from token:", req.user.id); // Log user ID extracted from token
  try {
    const orders = await orderModel.find({
      userId: req.user.id, // Find all orders for the user
    });
    console.log("Orders fetched:", orders); // Log orders retrieved from the database
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log("Error fetching orders:", error); // Log any errors
    res.json({ success: false, message: "Error fetching orders" });
  }
};

export { placeOrder, verifyOrder, userOrders };
