import { About } from "../assests/assests";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";

const AboutUs = () => {
  return (
    <div className=" mt-4 p-4">
      <section className=" flex items-center gap-3 mt-2">
        <h2 className="text-xl font-Poppins font-medium">
          Creating Seamless Connections Between
          <span className=" font-parisienne text-xl font-semibold ml-2 bg-green-200  ">
            "College Students and the Events That Shape Their Experience"
          </span>
        </h2>
        <p className="text-base font-Poppins text-slate-500 ml-[100px]">
          At{" "}
          <span className="font-semibold underline underline-offset-2 decoration-green-700 cursor-pointer  ">
            Campus Fete
          </span>
          , we connect college students with the best events happening on their
          campuses. Our platform makes it easy to discover and participate in
          academic, cultural, and social events that enrich student life. Join
          us in building connections that create lasting memories and
          opportunities!
        </p>
      </section>
      <h2 className=" text-center font-Poppins font-medium text-2xl mt-9 mr-12">
        Meet Our Developers
      </h2>
      {/* meet our developers */}
      <section className="mt-7">
        <div className="  p-4 mt-2 flex justify-center gap-8">
          {/* left */}
          <div className="   flex flex-col ">
            <div className="flex gap-3 items-center">
              <img
                src={About.karthik}
                alt="img_karthik"
                className=" cursor-pointer   w-[200px] h-[200px] object-cover border-r-8 border-b-8 border-slate-800 rounded-full shadow-xl shadow-slate-900"
              />
              <div className="  mt-5">
                <h2 className=" font-Poppins font-medium text-lg ">
                  KaturiKarthik
                </h2>
                <p className=" font-Poppins font-normal text-sm text-slate-500 text-wrap">
                  Full Stack Developer| Mern Stack expertise| Project Planner
                </p>
                <div className="mt-4">
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
              </div>
            </div>
          </div>
          <div className="border-l-2 border-gray-500 h-[200px]"></div>

          {/* right */}
          <div className="  flex flex-col ml-[50px] ">
            <div className=" flex gap-3 items-center">
              <img
                src={About.Arun}
                alt="img_Arun"
                className="cursor-pointer contrast-100 transition-all ease-all delay-100 w-[200px] h-[200px] object-cover border-r-8 border-b-8 border-slate-800 shadow-xl shadow-slate-900 rounded-full "
              />
              <div className="  mt-5 ">
                <h2 className=" font-Poppins font-medium text-lg">Arun</h2>
                <p className=" font-Poppins font-normal text-sm text-slate-500 text-wrap">
                  Full Stack Developer| Mern Stack expertise | Open source
                  Contributer
                </p>
                <div className="mt-4">
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
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Our Mission */}
      <h2 className=" text-center font-Poppins font-medium text-2xl mt-9 mr-12">
        Our Mission
      </h2>
      <section className="mt-5 "></section>
    </div>
  );
};

export default AboutUs;
