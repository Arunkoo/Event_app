import QueueIcon from "@mui/icons-material/Queue";
import SegmentIcon from "@mui/icons-material/Segment";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="w-[18%] max-sm:w-[25%] max-md:w-[26%]  h-[100vh] border-2 border-t-0 border-slate-400 ">
      {/* options */}
      <div className="pt-[50px] pl-[20%] max-sm:pl-[30%] flex flex-col gap-[20px]">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-[12px] px-[10px] py-[8px] cursor-pointer rounded-s-md border-2 border-r-0 ${
              isActive ? "bg-[#61e26e] border-green-700" : "border-slate-400"
            }`
          }
        >
          <QueueIcon />
          <p className="font-Poppins max-sm:hidden max-md:text-sm">
            Add Events
          </p>
        </NavLink>
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-[12px] px-[10px] py-[8px] cursor-pointer rounded-s-md border-2 border-r-0 ${
              isActive ? "bg-[#61e26e] border-green-700" : "border-slate-400"
            }`
          }
        >
          <SegmentIcon />
          <p className="font-Poppins max-sm:hidden max-md:text-sm">
            List Events
          </p>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-[12px] px-[10px] py-[8px] cursor-pointer rounded-s-md border-2 border-r-0 ${
              isActive ? "bg-[#61e26e] border-green-700" : "border-slate-400"
            }`
          }
        >
          <LocalActivityIcon />
          <p className="font-Poppins max-sm:hidden max-md:text-sm">
            Order Details
          </p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
