/* eslint-disable react/prop-types */

const MemCard = ({ photo, index }) => {
  return (
    <div className={index === 0 || index === 2 ? "mt-36" : null}>
      <img
        src={photo}
        alt="mem_img"
        className=" hover:contrast-75 w-[350px] h-[450px] object-cover  border-r-8 border-b-8 border-green-900 shadow-green-600 shadow-xl rounded-[89px] transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110  duration-300 "
      />
    </div>
  );
};

export default MemCard;
