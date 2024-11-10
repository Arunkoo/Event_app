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

    // Check if event is already in cartData
    if (userData.cartData.get(req.body.itemId)) {
      return res.json({ success: false, message: "Event already in cart" });
    }

    // Add event to cartData with a count of 1
    userData.cartData.set(req.body.itemId, 1);

    // Save the updated user document
    const updatedUser = await userData.save();

    // Log the updated user document to verify cartData
    // console.log("Updated User with cartData:", updatedUser);

    res.json({ success: true, message: "Event added to cart" });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// remove from cart
const removeFromCart = async (req, res) => {
  try {
    const userData = await userModel.findOne({ _id: req.user.id });

    // Check if userData exists
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Check if the item is in the cartData
    const currentQuantity = userData.cartData.get(req.body.itemId);

    if (currentQuantity && currentQuantity > 0) {
      userData.cartData.set(req.body.itemId, currentQuantity - 1);

      // Remove item from cart if quantity becomes 0
      if (userData.cartData.get(req.body.itemId) === 0) {
        userData.cartData.delete(req.body.itemId);
      }

      await userData.save();
      res.json({ success: true, message: "Event removed successfully" });
    } else {
      res.json({ success: false, message: "Event is not present in the cart" });
    }
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    res.status(500).json({ success: false, message: "Server error" });
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

    // Convert cartData from Map to Object
    const cartData = Object.fromEntries(userData.cartData);

    res.json({ success: true, data: cartData });
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).json({ success: false, message: "Data not found" });
  }
};

export { addToCart, removeFromCart, getCart };
