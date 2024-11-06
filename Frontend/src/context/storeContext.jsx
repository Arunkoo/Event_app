/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

import axios from "axios";

// storeName....
export const StoreContext = createContext(null);

//provider just like a shokeeper...
const StoreContextProvider = (props) => {
  const [eventList, setEventlist] = useState([]);
  const [cartItems, setCartItems] = useState(
    eventList.reduce((acc, event) => ({ ...acc, [event._id]: 0 }), {})
  );

  const url = "http://localhost:4000";

  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // add to cart function..
  const AddToCart = async (itemId) => {
    // there is not any item present in the cart...
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    }
    console.log(cartItems);
  };
  // remove from cart...
  const RemoveFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    console.log(cartItems);
  };

  // get Total Amount.....
  const GetTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = eventList.find((event) => event._id == item); // Use == to handle both Number and String

        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }

    return totalAmount;
  };

  // sales tax function ....
  const SalesTax = () => {
    const percentage = (GetTotalCartAmount() * 2) / 100;
    return percentage;
  };

  const Grand_Total = () => {
    const total = GetTotalCartAmount() + SalesTax();
    return total;
  };

  // fetch event  list function ......
  const fetchEventList = async () => {
    try {
      const response = await axios.get(url + "/api/event/list");
      setEventlist(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect...
  useEffect(
    () => {
      fetchEventList();
      if (token) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }

      GetTotalCartAmount();
      SalesTax();
      Grand_Total();
    },
    [token],
    [eventList, cartItems]
  );

  // products or state to be passed...
  const contextValue = {
    AddToCart,
    cartItems,
    setCartItems,
    RemoveFromCart,
    GetTotalCartAmount,
    SalesTax,
    Grand_Total,
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

// eslint-disable-next-line react-refresh/only-export-components
export default StoreContextProvider;
