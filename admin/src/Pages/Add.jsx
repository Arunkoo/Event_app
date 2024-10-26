import { material } from "../assets/assest";

const Add = () => {
  return (
    <div className="flex gap-10">
      <div className=" w-[70%] h-[95vh] ml-[25px] mt-3  font-Poppins    rounded-md py-5 px-4 bg-[#79eb84]">
        <form className="flex flex-col gap-[20px]  text-normal ">
          {/* Title */}
          <div className=" flex  gap-[155px]">
            <p className="font-Poppins font-medium">Title : </p>
            <input
              className="px-2 py-1 rounded-md"
              type="text"
              name="title"
              placeholder="Type here"
            />
          </div>
          {/* description */}
          <div className="flex gap-[100px]">
            <p className="font-Poppins font-medium">Description : </p>
            <textarea
              className="px-2 py-1 rounded-md"
              name="description"
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
              placeholder="Type here"
            />
          </div>
          {/* Category and price */}

          <div className="flex gap-[126px]">
            <p className="font-Poppins font-medium">Category :</p>
            <select
              className="text-slate-400 px-2 py-1 rounded-md"
              name="category"
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
              placeholder="₹ 100"
            />
          </div>

          {/* Image */}
          <div className="flex gap-5 mt-5">
            <p className="font-Poppins font-medium">Upload Image :</p>
            <label htmlFor="image">
              <img
                src={material.upload_area}
                alt="file_upload"
                className=" w-[350px] h-[150px] object-contain cursor-pointer "
              />
            </label>
            <input type="file" id="image" hidden required />
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
