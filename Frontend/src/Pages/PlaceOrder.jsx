import { useContext, useState } from "react";
import { StoreContext } from "../context/storeContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    totalCartAmount,
    salesTax,
    grandTotal,
    token,
    eventList,
    url,
    cartItems,
  } = useContext(StoreContext);

  // controlled inputs
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  // place Order function
  const placeOrder = async (event) => {
    event.preventDefault();

    // Prepare the order items array
    let orderItems = eventList
      .map((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = { ...item, quantity: cartItems[item._id] }; // Add quantity
          return itemInfo;
        }
        return null;
      })
      .filter((item) => item !== null); // Remove null items

    let orderData = {
      address: data,
      items: orderItems,
      amount: totalCartAmount + 2, // Delivery charges included
    };

    console.log("Sending order data:", orderData); // Log the order data

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { Authorization: `Bearer ${token}` }, // Ensure token is being sent correctly
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        toast.error("Error while placing order!");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      if (error.response) {
        console.error("Response data:", error.response.data); // Log the response data from the server
        toast.error(
          "Error placing order: " +
            (error.response?.data?.message || "Please try again.")
        );
      } else {
        toast.error("Error placing order. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={placeOrder}>
      <h1 className="font-Poppins text-2xl font-semibold text-center mt-4">
        Booking Information🔖
      </h1>
      <div className="flex p-6 mt-3 justify-around">
        {/* Personal details */}
        <div className="flex flex-col gap-4 p-8 w-[400px] bg-green-200 rounded-2xl">
          <h3 className="text-xl font-Poppins font-semibold mb-2">
            Personal Details🤗
          </h3>
          <input
            className="py-2 px-3 font-Poppins text-normal rounded-lg"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
            required
          />
          <input
            className="py-2 px-3 font-Poppins text-normal rounded-lg"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
            required
          />
          <input
            className="py-2 px-3 font-Poppins text-normal rounded-lg"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Email"
            required
          />
          <input
            className="py-2 px-3 font-Poppins text-normal rounded-lg"
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            type="tel"
            placeholder="Phone"
            required
          />
          <p className="text-sm font-normal font-Poppins mb-2 text-slate-500">
            ⚡These details needed to generate a ticket. Please fill them
            correctly.
          </p>
        </div>

        {/* Payment details */}
        <div className="mt-8 grid justify-end">
          <div className="flex flex-col gap-7 w-[450px]">
            <p className="font-Poppins text-base font-medium">
              SubTotal :{" "}
              <span className="text-slate-500 ml-2 font-normal">
                ₹ {totalCartAmount}
              </span>
            </p>
            <hr className="h-[1px] bg-slate-200" />
            <p className="font-Poppins text-base font-medium">
              Sales Tax (2%) :{" "}
              <span className="text-slate-500 ml-2 font-normal">
                ₹ {salesTax}
              </span>
            </p>
            <hr className="h-[1px] bg-slate-200" />
            <p className="font-Poppins text-base font-medium">
              Grand Total :{" "}
              <span className="ml-2 text-slate-500 font-normal">
                ₹ {grandTotal}
              </span>
            </p>
            <hr className="h-[1px] bg-slate-200" />
            <button
              type="submit"
              className="p-4 mt-6 text-normal font-Poppins font-semibold text-white bg-black"
            >
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
