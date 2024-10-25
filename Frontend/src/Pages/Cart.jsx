import { useContext } from "react";
import { event_list, illustration } from "../assests/assests";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { StoreContext } from "../context/storeContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const Navigate = useNavigate();
  const {
    cartItems,
    RemoveFromCart,
    GetTotalCartAmount,
    SalesTax,
    Grand_Total,
  } = useContext(StoreContext);

  const isCartEmpty = Object.values(cartItems).every((count) => count === 0); // Check if the cart is empty

  return (
    <div className="mt-[60px] p-5 ml-32 mr-24">
      {isCartEmpty ? (
        // Render illustration when the cart is empty
        <div className=" flex flex-col justify-center items-center">
          <h2 className=" text-2xl font-Poppins font-semibold">
            Oops! Your Cart Is Empty😫.
          </h2>
          <img
            src={illustration.carte3}
            alt="illustrations_cart"
            className=" w-[600px] h-[500px]"
          />
        </div>
      ) : (
        <>
          {/* Cart items */}
          <div className=" grid grid-cols-5 items-center text-gray-600 font-Poppins text-normal ">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
          </div>
          <br />
          <hr className="h-[1px] bg-slate-200 w-[60%]" />

          {event_list.map((item) => {
            if (cartItems[item.id] > 0) {
              return (
                <div key={item.id}>
                  {/* Cart item details */}
                  <div className="mt-[10px] mb-[10px] grid grid-cols-5 items-center   text-gray-600 font-Poppins text-normal">
                    <img
                      src={item.image}
                      alt="cart_image"
                      className="w-[150px] h-[85px] object-cover"
                    />
                    <p>{item.title}</p>
                    <p>₹{item.price}</p>
                    <button
                      className=""
                      onClick={() => RemoveFromCart(item.id)}
                    >
                      <RemoveCircleIcon className="cursor-pointer" />
                    </button>
                  </div>
                  <hr className="h-[1px] bg-slate-200 w-[60%]" />
                </div>
              );
            }
          })}

          {/* Cart subtotals */}
          <div className="mt-14 grid justify-end">
            <div className="grid grid-rows-4 w-[450px]">
              <p className="mb-1 font-Poppins text-base font-medium">
                SubTotal :{" "}
                <span className="text-slate-500 ml-2 font-normal">
                  ₹ {GetTotalCartAmount()}
                </span>
              </p>
              <hr className="h-[1px] bg-slate-200" />
              <p className="mb-1 font-Poppins text-base font-medium">
                Sales Tax (2%) :{" "}
                <span className="text-slate-500 ml-2 font-normal">
                  ₹ {SalesTax()}
                </span>
              </p>
              <hr className="h-[1px] bg-slate-200" />

              <p className="mt-1 font-Poppins text-base font-medium mb-3">
                Grand Total :{" "}
                <span className=" ml-2 text-slate-500 font-normal">
                  ₹ {Grand_Total()}
                </span>
              </p>
              <hr className="h-[1px] bg-slate-200" />
              <button
                onClick={() => Navigate("/order")}
                className="p-4 mt-4 text-normal font-Poppins font-semibold text-white bg-black"
              >
                Check Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
