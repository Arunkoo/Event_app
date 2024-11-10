import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/storeContext";
import axios from "axios";
import RedeemIcon from "@mui/icons-material/Redeem";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  Paper,
} from "@mui/material";

const Myorders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/userorders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setData(response.data.data);
      } else {
        console.error("Failed to fetch orders:", response.data.message);
      }
    } catch (error) {
      console.error(
        "Error fetching orders:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-extrabold font-Poppins text-center mb-8 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-900">
        My Orders
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((order, index) => (
          <Paper
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            elevation={3}
          >
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center space-x-3">
                <RedeemIcon className="text-green-700 text-4xl" />
                <Typography
                  variant="h6"
                  className="font-semibold text-gray-800 font-Poppins"
                >
                  OrderId: #{order._id}
                </Typography>
              </div>

              <Divider className="my-4" />

              <div className="space-y-2">
                <Typography variant="body1" className="text-gray-600">
                  <span className="font-medium">Items:</span>{" "}
                  <div className="flex overflow-x-auto space-x-2">
                    {order.items.map((item, idx) => (
                      <span key={idx} className="whitespace-nowrap">
                        {item.title} X {item.quantity}
                        {idx < order.items.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </Typography>
                <Typography variant="body1" className="text-gray-800">
                  <span className="font-medium">Total:</span> ${order.amount}.00
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </Typography>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <Typography variant="body2" className="text-gray-500">
                  {order.items.length} Items
                </Typography>
              </div>
            </CardContent>
          </Paper>
        ))}
      </div>
    </div>
  );
};

export default Myorders;
