import Navbar from "./Components/Navbar";
import "./index.css";
import SideBar from "./Components/SideBar";
import { Route, Routes } from "react-router-dom";
import Add from "./Pages/Add";

import Order from "./Pages/Order";
import List from "./Pages/List";

function App() {
  return (
    <div>
      <Navbar />
      <hr className="border-gray-400  mx-auto border-t-2" />
      <div className=" flex gap-3 ">
        <SideBar />
        {/* routes.. */}
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Order />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
