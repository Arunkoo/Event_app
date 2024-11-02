import Navbar from "./Components/Navbar";
import "./index.css";
import SideBar from "./Components/SideBar";
import { Route, Routes } from "react-router-dom";
import Add from "./Pages/Add";

import Order from "./Pages/Order";
import List from "./Pages/List";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const url = "http://localhost:4000";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr className="border-gray-400  mx-auto border-t-2" />
      <div className=" flex gap-3 ">
        <SideBar />
        {/* routes.. */}
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Order url={url} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
