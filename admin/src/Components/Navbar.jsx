import { material } from "../assets/assest";
import Avatar from "@mui/material/Avatar";

const Navbar = () => {
  return (
    <div className=" flex items-center justify-between px-6">
      <img src={material.logo} alt="_admin_logo" className="w-[82px]" />
      <Avatar alt="Zemy Sharp" src="/static/images/avatar/1.jpg" />
    </div>
  );
};

export default Navbar;
