import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useContext } from "react";
import { StoreContext } from "../context/storeContext";
/* eslint-disable react/prop-types */
const UpcomingCard = ({
  title,
  venue,
  image,
  description,
  price,
  date,
  id,
  category,
}) => {
  // store values...
  const { AddToCart, cartItems, RemoveFromCart } = useContext(StoreContext);
  const isSmallScreen = useMediaQuery("(max-width:600px)"); //small screen breakpoint
  const { url } = useContext(StoreContext);
  return (
    <div className=" p-4 border   shadow-xl transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300 relative">
      <FavoriteBorderOutlinedIcon className="absolute mt-2 ml-[380px] text-white size-3 z-10 cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300 " />
      <ShareOutlinedIcon className="absolute mt-2 ml-[350px] text-white size-3 z-10 cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300" />

      <img
        src={`${url}/images/` + image}
        alt="item_image"
        className="w-full h-[290px] object-cover hover:contrast-75 "
      />

      <div className="flex flex-1 flex-col mt-1">
        <span className="flex justify-start items-center gap-1 font-Poppins text-xs text-slate-600">
          <p>{date}</p>
          <p>|</p>
          <p>{venue}</p>
        </span>
        <h3 className="font-Poppins font-semibold text-[22px] antialiased hover:subpixel-antialiased">
          {title}
        </h3>
        <p className="font-Poppins text-sm line-clamp-2 text-slate-600  leading-5">
          {description}
        </p>
      </div>
      <div className="flex flex-1 mt-2 py-2 justify-between ">
        <h3 className="font-Poppins text-lg ">Price: ₹{price}</h3>
        {!cartItems[id] ? (
          <Button
            variant="contained"
            sx={{ backgroundColor: "black" }}
            size={isSmallScreen ? "small" : "medium"}
            onClick={() => AddToCart(id)}
          >
            Add To Cart
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ backgroundColor: "black" }}
            size={isSmallScreen ? "small" : "medium"}
            onClick={() => RemoveFromCart(id)}
          >
            Remove
          </Button>
        )}
      </div>
    </div>
  );
};

export default UpcomingCard;
