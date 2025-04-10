import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Typewriter from "./TypeWriter";
import { assest } from "../assests/assests";
import useMediaQuery from "@mui/material/useMediaQuery";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { motion } from "framer-motion";

const HeroSection = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <div className="flex flex-1 justify-center h-[60vh] items-center flex-col mt-3 py-3 relative">
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.02 }}
        transition={{ duration: 1.5 }}
        src={assest.grid3}
        alt="Background Grid"
        className="absolute w-full object-cover h-[64vh] z-[-10] mt-2 py-2"
      />

      <motion.span
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex justify-center items-center px-1 py-1 gap-1 md:gap-2 rounded-full bg-green-200 md:mb-6 mb-3 mt-10"
      >
        <Button
          variant="contained"
          color="success"
          sx={{ fontSize: isSmallScreen ? 7 : 10, borderRadius: 25 }}
        >
          New
        </Button>
        <p className="font-Poppins text-[15px] max-md:text-[12px]">
          Event is Live! Secure Your Place Now!🥳
        </p>
        {!isSmallScreen ? <NavigateNextIcon /> : ""}
      </motion.span>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-2xl md:text-6xl font-semibold font-Poppins mb-1 md:mb-2 tracking-normal text-center"
      >
        Explore a World
      </motion.h1>

      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-2xl md:text-6xl font-semibold font-Poppins tracking-normal mb-3 md:mb-5 text-center"
      >
        Of Events-
        <Typewriter />
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <Typography
          variant="p"
          className="text-slate-600 font-Poppins tracking-normal text-sm md:text-lg text-center"
        >
          Campus Fete brings all your campus events to one place.
        </Typography>
      </motion.div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.4 }}
      >
        <Button
          variant="outlined"
          sx={{
            backgroundColor: "black",
            color: "white",
            marginTop: "40px",
            marginBottom: "60px",
          }}
          size={isSmallScreen ? "small" : "large"}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Explore Now
        </Button>
      </motion.div>

      {/* Floating Images with entrance animations */}
      <motion.img
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="bg-cover shadow-lg z-[-1] shadow-green-900 w-12 h-12 md:w-20 md:h-20 md:border-4 border-2 border-green-900 rounded-full absolute mb-[345px] md:mb-[300px] mr-[300px] md:mr-[600px]"
        src={assest.pic1}
        alt=""
      />

      <motion.img
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="bg-cover shadow-lg shadow-yellow-500 md:border-4 border-2 border-yellow-500 w-12 h-12 z-[-1] md:w-20 md:h-20 rounded-full absolute mb-[345px] md:mb-[300px] ml-[300px] md:ml-[600px]"
        src={assest.pic2}
        alt=""
      />

      <motion.img
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="z-[-1] shadow-lg shadow-blue-700 w-12 h-12 md:w-20 md:h-20 border-2 md:border-4 border-blue-700 rounded-full absolute mt-[100px] md:mt-[200px] mr-[300px] md:mr-[600px]"
        src={assest.pic3}
        alt=""
      />

      <motion.img
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="z-[-1] bg-cover shadow-lg shadow-red-600 w-[70px] h-[70px] md:w-28 md:h-28 border-2 md:border-4 border-red-600 rounded-full absolute mr-[400px] md:mr-[850px] mb-[140px] md:mb-[100px]"
        src={assest.pic4}
        alt=""
      />

      <motion.img
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        src={assest.pic5}
        className="z-[-1] shadow-lg shadow-purple-800 w-[70px] h-[70px] md:w-28 md:h-28 border-2 md:border-4 border-purple-800 rounded-full absolute ml-[400px] md:ml-[850px] mb-[140px] md:mb-[100px]"
        alt=""
      />

      <motion.img
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        src={assest.pic7}
        className="shadow-lg shadow-yellow-950 w-12 h-12 md:w-20 md:h-20 border-2 md:border-4 border-yellow-950 rounded-full absolute mt-[100px] md:mt-[200px] ml-[300px] md:ml-[600px]"
        alt=""
      />
    </div>
  );
};

export default HeroSection;
