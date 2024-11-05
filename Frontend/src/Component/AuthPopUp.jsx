import axios from "axios";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { assest, Auth } from "../assests/assests";
import { StoreContext } from "../context/storeContext";

const AuthPopUp = ({ setShowAuth, currState, setCurrState }) => {
  // states...
  const { setToken, url } = useContext(StoreContext);

  // google window popup...
  const googleAuth = () => {
    window.open(`${url}/api/user/google`, "_self");
  };

  // taking a form data..
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // onLogin function..
  const onLogin = async (event) => {
    event.preventDefault();

    // Construct the URL based on currState
    const newUrl = `${url}/api/user/${currState}`; // Dynamic URL based on currState

    try {
      const response = await axios.post(newUrl, data, {
        withCredentials: true, // this ensures cookies are sent if needed (for sessions)
      });

      console.log("Response from server:", response); // Debugging line

      if (response.data.success) {
        console.log("Token received:", response.data.token); // Debugging line

        // Store the token and user data in context/localStorage
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);

        toast.success(response.data.message);
        setShowAuth(false); // Close the popup
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);

      // Show more specific error message if available
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "An error occurred");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  // return statement...
  return (
    <div
      className="p-5 shadow-md rounded-lg bg-green-200 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] w-[400px]"
      style={{ boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)" }} // optional: add shadow for better visibility
    >
      <form onSubmit={onLogin}>
        {/* login titles */}

        <div className=" flex items-center justify-between">
          <h2 className=" text-2xl font-Poppins font-semibold">
            {currState === "login" ? "Login" : "SignUp"}
          </h2>
          <img
            src={assest.close}
            onClick={() => setShowAuth(false)}
            alt="close"
            className=" cursor-pointer contrast-200 hover:scale-125 hover:rotate-12"
          />
        </div>

        {/* Login inputs */}
        <div className="mt-4 flex flex-col gap-4 ">
          {currState === "login" ? (
            <></>
          ) : (
            <input
              className="py-2 px-3 font-Poppins text-normal rounded-lg "
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Enter your name"
              required
            />
          )}

          <input
            className="py-2 px-3 font-Poppins text-normal rounded-lg "
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Enter your email"
            required
          />
          <input
            className="py-2 px-3 font-Poppins text-normal rounded-lg "
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
          />
        </div>

        {/* button and forget password... */}
        <div className="mt-3 flex flex-col gap-2">
          <span className="font-Poppins text-sm hover:underline hover:underline-offset-4 cursor-pointer">
            {currState === "sign_Up" ? " " : "Forget your password?"}
          </span>
          <button
            type="submit"
            className=" p-2  font-Poppins text-normal mt-1 rounded-lg border-2 border-green-800 hover:contrast-125 "
          >
            {currState === "sign_Up" ? "Create an account" : "Sign In"}
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
          <button
            type="button"
            onClick={googleAuth}
            className=" flex justify-center items-center gap-3 px-3 py-2 w-full bg-green-800 font-Poppins text-normal mt-1 rounded-lg text-white hover:contrast-125 "
          >
            <img src={Auth.Google} alt="google_img" className=" size-6" />
            <h2 className="font-Poppins text-white text-normal ">Google</h2>
          </button>
          {currState === "login" ? (
            <p className="text-sm font-Poppins cursor-pointer">
              Create a new account?
              <span
                className="ml-1 font-Poppins text-sm font-medium hover:underline hover:underline-offset-4"
                onClick={() => setCurrState("sign_Up")}
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p className="text-sm font-Poppins cursor-pointer">
              Already have an account?
              <span
                className="ml-1 font-Poppins text-sm font-medium hover:underline hover:underline-offset-4"
                onClick={() => setCurrState("login")}
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
