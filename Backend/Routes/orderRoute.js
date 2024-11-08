import express from "express";
import { placeOrder } from "../controller/orderController.js";
import authMiddleware from "../middleware/Auth.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);

export default orderRouter;
