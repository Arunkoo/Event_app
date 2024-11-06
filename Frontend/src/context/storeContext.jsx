import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import authPopUp from "../Component/AuthPopUp";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [eventList, setEventList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [showAuth, setShowAuth] = useState(false);
  const url = "http://localhost:4000";
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [totalCartAmount, setTotalCartAmount] = useState(0);
  const [salesTax, setSalesTax] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

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
      await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        { headers: { token } }
      );
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
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        { headers: { token } }
      );
    } catch (error) {
      console.error("Error while removing item", error);
    }
  };
  const GetTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = eventList.find((event) => event._id == item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const SalesTax = () => (GetTotalCartAmount() * 2) / 100;
  const Grand_Total = () => GetTotalCartAmount() + SalesTax();

  const loadCartData = async (token) => {
    try {
      const response = await axios.get(`${url}/api/cart/get`, {
        headers: { token },
      });
      setCartItems(response.data.data || {});
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const fetchEventList = async () => {
    try {
      const response = await axios.get(`${url}/api/event/list`);
      setEventList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function loadData() {
      try {
        await fetchEventList(); // Load the event list for display

        if (token) {
          // If the user is logged in
          setToken(token); // Sync token state with localStorage
          await loadCartData(token); // Load the cart data for logged-in users
        }
      } catch (error) {
        console.error("Error while fetching:", error);
      }
    }

    // Call loadData to initialize on mount or token change
    loadData();

    // Sync localStorage with token state
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
      setCartItems({}); // Clear cart data when logged out
    }

    // Update totals for the cart
    setTotalCartAmount(GetTotalCartAmount());
    setSalesTax(SalesTax());
    setGrandTotal(Grand_Total());
  }, [token, eventList, cartItems]);

  const contextValue = {
    AddToCart,
    cartItems,
    setCartItems,
    RemoveFromCart,
    totalCartAmount,
    salesTax,
    grandTotal,
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
