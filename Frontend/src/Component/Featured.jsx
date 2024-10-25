import { feat_list } from "../assests/assests";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const Featured = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)"); //small screen breakpoint
  return (
    <div className=" mt-5 max-sm:mt-14   p-8 max-sm:p-1 ">
      <h1 className=" text-[36px] max-sm:text-[24px] font-Poppins font-semibold max-sm:font-normal    inline-block ">
        Featured Event
      </h1>
      <div className=" flex max-sm:flex-col max-sm:gap-6  mt-11 max-sm:mt-5 relative ">
        <span className="absolute z-10 text-white text-4xl ml-[790px] mt-3 flex justify-center items-center gap-1 cursor-pointer ">
          <FavoriteBorderOutlinedIcon className="transition ease-in-out delay-300  hover:-translate-y-1 hover:scale-110  " />
          <ShareOutlinedIcon className="transition ease-in-out delay-300  hover:-translate-y-1 hover:scale-110  " />
        </span>

        <img
          src={feat_list.image}
          alt=""
          className=" w-[55vw] max-sm:w-[100%] h-[480px] max-sm:h-[400px] object-cover max-sm:object-center rounded-2xl mr-9 max-sm:mr-0 shadow-black shadow-4xl contrast-100 hover: translate-x-3  transistion ease-in-out delay-200"
        />
        {/* right part */}
        <div className="border-l-8 max-sm:border-l-4 bg-green-100  rounded-r-2xl  border-green-800 shadow-inner shadow-green- p-5 ">
          <h1 className="text-[27px] max-sm:text-[21px] text-semi-bold font-Poppins text-center mb-3">
            {feat_list.title}
          </h1>
          {/* <span className="flex justify-start items-center gap-1 font-Poppins text-xs text-slate-600">
            <p>{feat_list.date}</p>
            <p>|</p>
            <p>{feat_list.venue}</p>
          </span> */}

          <p className="font-Poppins leading-5   text-slate-600 tracking-wide text-pretty mt-2">
            {feat_list.description}
          </p>
          <h3 className=" font-Poppins text-semibold mt-4 max-sm:mt-2 text-[18px] max-sm:text-[16px] underline underline-offset-4 italic">
            Hosted By
          </h3>
          <span className=" flex gap-2 mt-4 ">
            {feat_list.host.map((item) => (
              <img
                key={item.id}
                src={item.img}
                alt=""
                className=" size-14 max-sm:size-10 rounded-full object-cover  shadow-black shadow-md transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300 cursor-pointer"
              />
            ))}
          </span>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "black",
              color: "white",
              marginTop: "40px",
              width: "100%",
              padding: "10px",
              borderRadius: "16px",
            }}
            size={isSmallScreen ? "small" : "large"}
          >
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
