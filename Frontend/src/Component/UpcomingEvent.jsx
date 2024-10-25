import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import UpcomingCard from "./UpcomingCard";
import { event_list } from "../assests/assests.js";
import { useState } from "react";

const UpcomingEvent = () => {
  const Events = ["cultural", "Tech", "Non-Tech"];
  // states....
  const [value, setValue] = useState(null);
  console.log(value);

  return (
    <div
      className="flex flex-col  justify-center items-center mt-24 max-sm:mt-9  p-8 max-sm:p-1 "
      id="UpcomingEvent"
    >
      {/* header */}
      <div className="flex justify-between   items-center w-full ">
        <h1 className=" text-[36px] max-sm:text-[24px] max-sm:font-normal font-Poppins font-semibold    inline-block ">
          Upcoming Events
        </h1>

        <Autocomplete
          value={value}
          onChange={(event, newvalue) => setValue(newvalue)}
          className="w-[190px] max-sm:w-[150px] max-sm:h-10 max-sm:flex max-sm:justify-center max-sm:items-center max-sm:p-4"
          options={Events}
          renderInput={(params) => <TextField {...params} label="Category" />}
        ></Autocomplete>
      </div>
      {/* card */}
      <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-6 w-full mt-10">
        {event_list.map((item, index) => {
          if (value === item.category || (value === null && item.id < 7)) {
            return (
              <UpcomingCard
                key={index}
                id={item.id}
                venue={item.venue}
                title={item.title}
                image={item.image}
                description={item.description}
                category={item.category}
                price={item.price}
                date={item.date}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default UpcomingEvent;
