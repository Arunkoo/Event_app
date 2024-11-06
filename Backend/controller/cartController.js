import userModel from "../Models/userModel.js";

// add to cart...
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove from cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
      res.json({ success: true, message: "Event removed succesfully" });
    } else {
      res.json({ success: false, message: "Event is not present" });
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: true, message: "Error" });
  }
};

// fetchuser cart data...
const getCart = async (req, res) => {
  try {
    const userData = await userModel.findOne({ _id: req.body.userId });

    // Check if userData exists
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Access cartData from userData
    const cartData = userData.cartData; // Adjust if the path to cartData is different

    res.json({ success: true, data: cartData });
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).json({ success: false, message: "Data not found" });
  }
};

export { addToCart, removeFromCart, getCart };
