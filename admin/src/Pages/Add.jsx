import { useState } from "react";
import { material } from "../assets/assest";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  // url...
  const url = "http://localhost:5000";
  // storing a image...
  const [image, setImage] = useState(false);

  // const form data...
  const [data, setData] = useState({
    title: "",
    description: "",
    venue: "",
    category: "Cultural",
    price: "",
    date: "",
  });

  // handler function to set values...
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  // handler of images...
  const onImageChange = (e) => {
    const file = e.target.files[0];
    // Check if file is in jpg or png format
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setImage(file);
    } else {
      toast.error("Only JPG and PNG formats are allowed.");
    }
  };

  // onSubmit function....
  const onSubmitHandler = async (event) => {
    // ...
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("venue", data.venue);
    formData.append("category", data.category);
    formData.append("price", Number(data.price));
    formData.append("date", Number(data.date));
    formData.append("image", image);
    // api call from backend...

    try {
      const response = await axios.post(`${url}/api/event/add`, formData);
      if (response.data.success) {
        setData({
          title: "",
          description: "",
          venue: "",
          category: "Cultural",
          price: "",
          date: "",
        });
        setImage(false);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log("Error while adding event data", error);
      toast.error("Error while adding event");
    }
  };

  return (
    <div className="flex gap-10">
      <div className=" w-[70%]  ml-[25px] mt-3  font-Poppins    rounded-md py-5 px-4 bg-[#79eb84] ">
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-[20px]  text-normal h-[60vh] cursor-pointer"
        >
          {/* Title */}
          <div className=" flex  gap-[155px]">
            <p className="font-Poppins font-medium">Title : </p>
            <input
              className="px-2 py-1 rounded-md"
              type="text"
              name="title"
              onChange={onChangeHandler}
              value={data.title}
              placeholder="Type here"
            />
          </div>
          {/* description */}
          <div className="flex gap-[100px]">
            <p className="font-Poppins font-medium">Description : </p>
            <textarea
              className="px-2 py-1 rounded-md"
              name="description"
              onChange={onChangeHandler}
              value={data.description}
              cols={50}
              rows={6}
              placeholder="Write content here"
            ></textarea>
          </div>
          {/* venue */}
          <div className="flex gap-[150px] ">
            <p className="font-Poppins font-medium">Venue :</p>
            <input
              className="px-2 py-1 rounded-md"
              type="text"
              name="venue"
              onChange={onChangeHandler}
              value={data.venue}
              placeholder="Type here"
            />
          </div>
          {/* Category and price */}

          <div className="flex gap-[126px]">
            <p className="font-Poppins font-medium">Category :</p>
            <select
              className="text-slate-400 px-2 py-1 rounded-md"
              name="category"
              onChange={onChangeHandler}
              value={data.category}
            >
              <option value="Cultural">Cultural</option>
              <option value="Tech">Tech</option>
              <option value="Non-Tech">Non-Tech</option>
            </select>
          </div>
          <div className="flex gap-[160px]">
            <p className="font-Poppins font-medium">Price :</p>
            <input
              className="px-2 py-1 rounded-md text-slate-400"
              type="Number"
              name="price"
              onChange={onChangeHandler}
              value={data.price}
              placeholder="₹ 100"
            />
          </div>

          <div className="flex gap-[160px]">
            <p className="font-Poppins font-medium">Date :</p>
            <input
              className="px-2 py-1 rounded-md text-slate-400"
              type="date"
              name="date"
              onChange={onChangeHandler}
              value={data.date}
              placeholder=""
            />
          </div>

          {/* Image */}
          <div className="flex gap-5 mt-5">
            <p className="font-Poppins font-medium">Upload Image :</p>
            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : material.upload_area}
                alt="file_upload"
                className=" w-[350px] h-[150px] object-contain cursor-pointer "
              />
            </label>
            <input onChange={onImageChange} type="file" id="image" hidden />
          </div>
          {/* button submit */}
          <div className=" flex justify-center items-center mt-5">
            <button
              type="submit"
              className="p-1 h-[50px] w-[200px] bg-black text-white font-semibold rounded-md"
            >
              ADD
            </button>
          </div>
        </form>
      </div>
      <div className="w-[300px] h-[500px] object-cover mt-[150px] ml-11">
        <img src={material.illustration} alt="illustration" />
      </div>
    </div>
  );
};

export default Add;
