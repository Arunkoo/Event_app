/* eslint-disable react/prop-types */
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import ArrowOutwardOutlinedIcon from "@mui/icons-material/ArrowOutwardOutlined";
import Badge from "@mui/material/Badge";
import { assest } from "../assests/assests";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/storeContext";

const Navbar = ({ setShowAuth, setCurrState }) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isLargeScreen = useMediaQuery("(min-width:1024px)");
  // store value ...
  const { cartItems } = useContext(StoreContext);
  const totalItems = Object.values(cartItems).reduce(
    (acc, count) => acc + count,
    0
  );

  return (
    <div className="flex flex-1 items-center justify-between gap-10 w-full border-b-2">
      <NavLink to={"/"}>
        <img
          src={assest.logo}
          alt="websiteLogo"
          className="w-[85px] max-sm:w-[60px]"
        />
      </NavLink>

      <div className="flex justify-center items-center gap-10 text-lg font-Poppins font-medium text-slate-600 max-lg:hidden">
        <NavLink to={"/"} className="active:text-green-900">
          Home
        </NavLink>
        <NavLink to={"/events"}>Events</NavLink>
        <NavLink to={"/about"}>About Us</NavLink>
        <NavLink to={"/contact"}>Contact Us</NavLink>
      </div>

      <Stack direction="row" spacing={isSmallScreen ? 1.5 : 3}>
        <NavLink to={"/cart"}>
          <Badge
            className=" absolute ml-3"
            color="success"
            badgeContent={totalItems}
          >
            <LocalMallOutlinedIcon sx={{ fontSize: isSmallScreen ? 30 : 35 }} />
          </Badge>
        </NavLink>

        <Button
          variant="outlined"
          color="inherit"
          size={isSmallScreen ? "small" : "medium"}
          onClick={() => {
            setCurrState("Login"); // Set currState to "Login"
            setShowAuth(true); // Show the popup
          }}
        >
          Login
        </Button>
        <Button
          variant="contained"
          endIcon={<ArrowOutwardOutlinedIcon />}
          sx={{ backgroundColor: "black" }}
          size={isSmallScreen ? "small" : "medium"}
          onClick={() => {
            setCurrState("Sign Up"); // Set currState to "Sign Up"
            setShowAuth(true); // Show the popup
          }}
        >
          Get Started
        </Button>

        {!isLargeScreen && (
          <MenuIcon sx={{ fontSize: 30, cursor: "pointer" }} />
        )}
      </Stack>
    </div>
  );
};

export default Navbar;
