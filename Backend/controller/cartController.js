import userModel from "../Models/userModel.js";

// add to cart...
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // Extract userId from JWT token or request body

    // Find the user by ID
    const userData = await userModel.findOne({ _id: userId });

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Initialize cartData if it doesn't exist
    if (!userData.cartData) {
      userData.cartData = {};
    }

    // Increment or add item to cartData
    if (userData.cartData[req.body.itemId]) {
      userData.cartData[req.body.itemId]++;
    } else {
      userData.cartData[req.body.itemId] = 1;
    }

    await userData.save();

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// remove from cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.user.id });
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
    const userData = await userModel.findOne({ _id: req.user.id });

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
