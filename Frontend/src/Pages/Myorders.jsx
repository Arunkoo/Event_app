import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/storeContext";
import axios from "axios";

import RedeemIcon from "@mui/icons-material/Redeem";

const Myorders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  //   fetch orders....
  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response); // Log full response
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);
  return (
    <div>
      <h2>My Orders</h2>
      <div>
        {data.map((order, index) => {
          return (
            <div key={index}>
              <RedeemIcon />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.title + " X " + item.quantity;
                  } else {
                    return item.title + " X " + item.quantity + ",";
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>Items:{order.items.length}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              <button>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Myorders;
