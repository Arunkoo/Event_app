/* eslint-disable react/prop-types */

import { assest, Auth } from "../assests/assests";
const AuthPopUp = ({ setShowAuth, currState, setCurrState }) => {
  // states...

  return (
    <div
      className="p-5 shadow-md rounded-lg bg-green-200 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] w-[400px]"
      style={{ boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" }} // optional: add shadow for better visibility
    >
      <form>
        {/* login titles */}

        <div className=" flex items-center justify-between">
          <h2 className=" text-2xl font-Poppins font-semibold">{currState}</h2>
          <img
            src={assest.close}
            onClick={() => setShowAuth(false)}
            alt="close"
            className=" cursor-pointer contrast-200 hover:scale-125 hover:rotate-12"
          />
        </div>

        {/* Login inputs */}
        <div className="mt-4 flex flex-col gap-4 ">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              className="py-2 px-3 font-Poppins text-normal rounded-lg "
              type="text"
              placeholder="Enter your name"
            />
          )}

          <input
            className="py-2 px-3 font-Poppins text-normal rounded-lg "
            type="text"
            placeholder="Enter your email"
          />
          <input
            className="py-2 px-3 font-Poppins text-normal rounded-lg "
            type="text"
            placeholder="Password"
          />
        </div>

        {/* button and forget password... */}
        <div className="mt-3 flex flex-col gap-2">
          <span className="font-Poppins text-sm hover:underline hover:underline-offset-4 cursor-pointer">
            {currState === "Sign Up" ? " " : "Forget your password?"}
          </span>
          <button className=" p-2  font-Poppins text-normal mt-1 rounded-lg border-2 border-green-800 hover:contrast-125 ">
            {currState === "Sign Up" ? "Create an account" : "Sign In"}
          </button>
        </div>

        {/* login Auth O credentials */}
        <div className="flex items-center justify-center my-5">
          <hr className="w-24 border-gray-400" />
          <p className="px-3 font-Poppins text-sm text-gray-600">
            {currState === "Sign Up" ? "or Sign Up with" : "or Sign In with"}
          </p>
          <hr className="w-24 border-gray-400" />
        </div>
        <div className=" flex flex-col gap-3">
          <button className=" flex justify-center items-center gap-3 px-3 py-2 w-full bg-green-800 font-Poppins text-normal mt-1 rounded-lg text-white hover:contrast-125 ">
            <img src={Auth.Google} alt="google_img" className=" size-6" />
            <h2 className="font-Poppins text-white text-normal ">Google</h2>
          </button>
          {currState === "Login" ? (
            <p className="text-sm font-Poppins cursor-pointer">
              Create a new account?
              <span
                className="ml-1 font-Poppins text-sm font-medium hover:underline hover:underline-offset-4"
                onClick={() => setCurrState("Sign Up")}
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p className="text-sm font-Poppins cursor-pointer">
              Already have an account?
              <span
                className="ml-1 font-Poppins text-sm font-medium hover:underline hover:underline-offset-4"
                onClick={() => setCurrState("Login")}
              >
                Login
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthPopUp;
