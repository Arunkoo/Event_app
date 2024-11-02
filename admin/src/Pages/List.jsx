/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  // fetch all the events from the backend...
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/event/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("error while fetching");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while Fetching");
    }
  };

  // calling a remove api to delete a particular event..
  const removeEvent = async (eventId) => {
    try {
      const response = await axios.post(`${url}/api/event/remove`, {
        id: eventId,
      });

      if (response.data.success) {
        await fetchList();
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while deleting event!");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="flex flex-col p-8 w-full">
      <h2 className="font-Poppins font-medium text-2xl text-center mr-[120px] underline underline-offset-4 decoration-green-600">
        All Events List
      </h2>

      {/* Table format */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left font-Poppins font-medium text-slate-500">
                Image
              </th>
              <th className="px-4 py-2 text-left font-Poppins font-medium text-slate-500">
                Title
              </th>
              <th className="px-4 py-2 text-left font-Poppins font-medium text-slate-500">
                Category
              </th>
              <th className="px-4 py-2 text-left font-Poppins font-medium text-slate-500">
                Price
              </th>
              <th className="px-4 py-2 text-left font-Poppins font-medium text-slate-500">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">
                  <img
                    src={`${url}/images/` + item.image}
                    alt=""
                    className="w-[80px] h-[80px] object-contain"
                  />
                </td>
                <td className="px-4 py-2 text-slate-500">{item.title}</td>
                <td className="px-4 py-2 text-slate-500">{item.category}</td>
                <td className="px-4 py-2 text-slate-500">₹ {item.price}</td>
                <td className="px-4 py-2 text-slate-500">
                  <button
                    onClick={() => removeEvent(item._id)}
                    className="text-red-500 hover:scale-x-150 hover:scale-y-150"
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
