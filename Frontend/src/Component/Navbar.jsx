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
import { useContext, useState } from "react";
import { StoreContext } from "../context/storeContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = ({ setShowAuth, setCurrState }) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isLargeScreen = useMediaQuery("(min-width:1024px)");

  // Store values
  const {
    cartItems = {},
    token,
    setToken,
    setCartItems,
    userName = "",
  } = useContext(StoreContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const totalItems = Object.values(cartItems).reduce(
    (acc, count) => acc + (count || 0),
    0
  );

  const onLogout = () => {
    setToken(null);
    setCartItems({});
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/");
    window.location.reload();
  };
  const onTicket = () => {
    navigate("/myOrders");
  };

  // Avatar setup
  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  function stringAvatar(name = "Guest") {
    const nameParts = name.trim().split(" ");
    const initials =
      nameParts.length > 1
        ? `${nameParts[0][0]}${nameParts[1][0]}`
        : nameParts[0][0];

    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: initials.toUpperCase(),
    };
  }

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

      <Stack
        direction="row"
        spacing={isSmallScreen ? 1.5 : 3}
        marginRight={4}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <NavLink to={"/cart"}>
          <Badge
            className="absolute ml-3"
            color="success"
            badgeContent={totalItems}
          >
            <LocalMallOutlinedIcon sx={{ fontSize: isSmallScreen ? 30 : 35 }} />
          </Badge>
        </NavLink>

        {!token ? (
          <>
            <Button
              variant="outlined"
              color="inherit"
              size={isSmallScreen ? "small" : "medium"}
              onClick={() => {
                setCurrState("login");
                setShowAuth(true);
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
                setCurrState("sign_Up");
                setShowAuth(true);
              }}
            >
              Get Started
            </Button>
          </>
        ) : (
          <div>
            <div
              className="cursor-pointer shadow-2xl border-4 border-neutral-600/15 p-1 rounded-full"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Avatar {...stringAvatar(userName || "Guest")} />
            </div>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  onTicket();
                }}
              >
                My Tickets
              </MenuItem>
              <MenuItem onClick={onLogout}>Logout</MenuItem>
            </Menu>
          </div>
        )}

        {!isLargeScreen && (
          <MenuIcon sx={{ fontSize: 30, cursor: "pointer" }} />
        )}
      </Stack>
    </div>
  );
};

export default Navbar;
