import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../context/storeContext";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  //   verify payment..
  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", {
      success,
      orderId,
    });
    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  };
  useEffect(() => {
    verifyPayment();
  }, []);
  console.log(success, orderId);
  return (
    <div className="flex justify-center items-center min-h-[35vh]">
      <Stack sx={{ color: "grey.500" }}>
        <CircularProgress color="success" />
      </Stack>
    </div>
  );
};

export default Verify;
