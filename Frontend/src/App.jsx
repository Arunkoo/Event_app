import { useContext, useEffect, useState } from "react";
import "./App.css";
import Footer from "./Component/Footer";
import Navbar from "./Component/Navbar";
import Event from "./Pages/Event";
import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import AuthPopUp from "./Component/AuthPopUp";
import Cart from "./Pages/Cart";
import PlaceOrder from "./Pages/PlaceOrder";
import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useSearchParams } from "react-router-dom";
import { StoreContext } from "./context/storeContext";

function App() {
  const [showAuth, setShowAuth] = useState(false); // state for showing popup
  const [currState, setCurrState] = useState("sign_Up"); // state to track Login or Sign Up

  const { setToken } = useContext(StoreContext);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      setToken(token);
      localStorage.setItem("token", token); // Persist token in localStorage
    }
  }, [searchParams, setToken]);

  return (
    <>
      {showAuth && (
        <AuthPopUp
          setShowAuth={setShowAuth}
          currState={currState}
          setCurrState={setCurrState}
        />
      )}
      <div
        className={`${
          showAuth ? " blur-sm select-none" : " "
        } max-lg:px-2 max-md:px-10 py-1 max-sm:py-1`}
      >
        <Navbar setShowAuth={setShowAuth} setCurrState={setCurrState} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Event />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>

        <Footer />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
