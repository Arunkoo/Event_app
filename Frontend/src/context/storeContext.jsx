/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { event_list } from "../assests/assests";

// storeName....
export const StoreContext = createContext(null);

//provider just like a shokeeper...
const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

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
        let itemInfo = event_list.find((event) => event.id === Number(item));

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

  // products or state to be passed...
  const contextValue = {
    AddToCart,
    cartItems,
    setCartItems,
    RemoveFromCart,
    GetTotalCartAmount,
    SalesTax,
    Grand_Total,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default StoreContextProvider;