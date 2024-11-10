import { createContext, useEffect, useState, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [eventList, setEventList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [showAuth, setShowAuth] = useState(false);
  const url = "http://localhost:4000";
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [totals, setTotals] = useState({
    totalCartAmount: 0,
    salesTax: 0,
    grandTotal: 0,
  });

  const notifyLoginRequired = () => {
    toast.info("Please log in to continue.");
    setShowAuth(true); // Show authPop component
  };

  // Add to cart....
  const AddToCart = async (itemId) => {
    // Check for token before adding to cart
    if (!token) {
      notifyLoginRequired();
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        // Only update the state for the affected item
        setCartItems((prev) => ({
          ...prev,
          [itemId]: (prev[itemId] || 0) + 1,
        }));
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // Remove item from cart....
  // Remove item from cart
  const RemoveFromCart = async (itemId) => {
    // Check for token before removing from cart
    if (!token) {
      notifyLoginRequired();
      return;
    }

    try {
      const response = await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        // Only update the state for the affected item
        setCartItems((prev) => {
          const updatedCart = { ...prev };
          delete updatedCart[itemId];
          return updatedCart;
        });
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Calculating totals, with checks to prevent errors
  const calculateTotals = useMemo(() => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        // Check if eventList is populated and if the item exists in eventList
        const itemInfo = eventList.find((event) => event._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    const salesTax = (totalAmount * 2) / 100;
    const grandTotal = totalAmount + salesTax;

    return { totalCartAmount: totalAmount, salesTax, grandTotal };
  }, [cartItems, eventList]);

  useEffect(() => {
    async function loadData() {
      try {
        // Fetch event list once
        const eventResponse = await axios.get(`${url}/api/event/list`);
        setEventList(eventResponse.data.data);

        // Load cart data for logged-in users
        if (token) {
          const cartResponse = await axios.get(`${url}/api/cart/get`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // Ensure cart data is correctly set even if it's empty
          setCartItems(cartResponse.data.data || {});
        }
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    }

    // Initial data load
    loadData();

    // Store token to localStorage if available
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
      setCartItems({}); // Clear cart data when logged out
    }
  }, [token]);

  // Update totals only when cartItems or eventList changes
  useEffect(() => {
    setTotals(calculateTotals);
  }, [calculateTotals]);

  const contextValue = {
    AddToCart,
    cartItems,
    setCartItems,
    RemoveFromCart,
    totalCartAmount: totals.totalCartAmount,
    salesTax: totals.salesTax,
    grandTotal: totals.grandTotal,
    eventList,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
