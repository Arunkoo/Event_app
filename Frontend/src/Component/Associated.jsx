import { assest } from "../assests/assests";

const Associated = () => {
  return (
    <div className=" flex flex-col justify-center items-center relative ">
      {/* <img
        src={assest.grid4}
        alt=""
        className="absolute z-[-10] opacity-[0.03] object-cover w-full h-[25vh]"
      /> */}
      <h2 className=" text-2xl font-parisienne font-semibold ">
        In Collaboration With
      </h2>
      <img src={assest.gkv} alt="College logo" className=" w-28 h-28" />
    </div>
  );
};

export default Associated;
