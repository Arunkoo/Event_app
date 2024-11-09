/* eslint-disable react/prop-types */
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

  const AddToCart = async (itemId) => {
    if (!token) {
      notifyLoginRequired();
      return;
    }

    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

    try {
      const response = await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Check if the backend response includes the updated cartData
      if (response.data.success) {
        setCartItems(response.data.data); // Update cart with the latest data from the backend
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const RemoveFromCart = async (itemId) => {
    if (!token) {
      notifyLoginRequired();
      return;
    }

    setCartItems((prev) => {
      const newCount = (prev[itemId] || 0) - 1;
      return { ...prev, [itemId]: newCount > 0 ? newCount : 0 };
    });

    try {
      const response = await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Check if the backend response includes the updated cartData
      if (response.data.success) {
        setCartItems(response.data.data); // Update cart with the latest data from the backend
      }
    } catch (error) {
      console.error("Error while removing item from cart:", error);
    }
  };

  const calculateTotals = useMemo(() => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
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
