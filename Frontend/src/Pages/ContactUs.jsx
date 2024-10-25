import { Informaion } from "../assests/assests";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";

const ContactUs = () => {
  return (
    <form>
      <h1 className=" font-Poppins text-2xl font-semibold text-center mt-4">
        Get In Touch
        <SupportAgentOutlinedIcon
          sx={{ fontSize: 40 }}
          className="ml-3 h-[100px]"
        />
      </h1>
      <div className="flex p-6 mt-9 ml-32  gap-[200px] ">
        {/* information part  */}
        <div className=" flex flex-col gap-4 p-8 w-[400px]  bg-green-200 rounded-2xl">
          <h3 className=" text-xl font-Poppins font-semibold mb-2">
            Personal Details🤗
          </h3>
          <input
            className="py-2 px-3 font-Poppins text-normal rounded-lg "
            type="text"
            placeholder="First Name"
            required
          />

          <input
            className="py-2 px-3 font-Poppins text-normal rounded-lg "
            type="text"
            placeholder="Last Name"
            required
          />

          <input
            className="py-2 px-3 font-Poppins text-normal rounded-lg "
            type="email"
            placeholder="email"
            required
          />

          <textarea
            className="py-2 px-3 font-Poppins text-normal rounded-lg text-slate-400"
            required
            placeholder="Enter you thoughts here"
          ></textarea>
          <button className="p-2 h-11 font-Poppins text-sm text-white bg-black">
            Raise A Ticket
          </button>
        </div>
        <img
          src={Informaion.contact}
          alt=""
          className="w-[400px] h-[400px] ml-36 object-cover"
        />
      </div>
    </form>
  );
};

export default ContactUs;
