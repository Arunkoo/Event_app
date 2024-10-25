/* eslint-disable react/no-unescaped-entities */
import { assest } from "../assests/assests";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import RssFeedIcon from "@mui/icons-material/RssFeed";

const Footer = () => {
  return (
    <div className="flex flex-col  p-5 mt-28 bg-black  text-white contrast-100 ">
      <div className="  flex gap-4  items-center justify-between">
        {/* first div */}
        <div className="">
          <div className="flex  items-center ">
            <img
              src={assest.Dark_logo}
              alt="Brand-logo"
              className="w-[85px]  max-sm:w-[60px] "
            />
            <h2 className="text-4xl mr-2 font-normal text-gray-400">|</h2>
            <h2 className="text-2xl font-poppins ">Campus Fete</h2>
          </div>

          <p className="text-xl font-semibold font-parisienne tracking-wide text-slate-500">
            "Discover, Participate and Enjoy."
          </p>
        </div>
        <div className=" p-3 flex flex-col ">
          <h2 className="text-xl font-Poppins font-normal">Menu</h2>
          <ul className="text-normal font-Poppins font-normal mt-3">
            <li className="hover:underline hover:underline-offset-4">
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:underline-offset-4">
                Event
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:underline-offset-4">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:underline-offset-4">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div className=" p-3 ">
          <h2 className="text-xl font-Poppins font-normal ">Company</h2>
          <ul>
            <li>
              <a href="#" className="hover:underline hover:underline-offset-4">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:underline-offset-4">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-Poppins font-normal mb-3">
            Get In Touch
          </h2>
          <InstagramIcon
            sx={{ fontSize: "27px", mr: "3px" }}
            className="hover:text-pink-900 cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300"
          />
          <LinkedInIcon
            sx={{ fontSize: "27px", mr: "3px" }}
            className="hover:text-cyan-600 cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300"
          />
          <GitHubIcon
            className="hover:text-slate-700 cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300"
            sx={{ fontSize: "27px", mr: "3px" }}
          />
          <FacebookIcon
            className="hover:text-blue-800 cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300"
            sx={{ fontSize: "27px", mr: "3px" }}
          />
          <XIcon
            className=" cursor-pointer transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300"
            sx={{ fontSize: "27px", mr: "3px" }}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="mt-6 ">
            <h2 className="text-xl font-Poppins font-normal mb-3">
              Subscribe Us <RssFeedIcon />
            </h2>
            <div className=" flex justify-center items-center gap-3">
              <input
                type="text"
                placeholder="Enter Your Email"
                className="p-3 rounded-full text-base font-Poppins outline-none text-black"
              />
              <button className="py-3 px-4 bg-green-800 text-white font-Poppins font-normal hover:opacity-75 rounded-full transition ease-in-out delay-150   hover:scale-110  duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* copyright section */}
      <div>
        <hr className="w-full font-bold text-xl text-slate-600 mt-10" />
        <p className="text-center mt-5 font-Poppins">
          ©2024 CampusFete, All right reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
