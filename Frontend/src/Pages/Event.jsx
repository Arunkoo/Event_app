import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import UpcomingCard from "../Component/UpcomingCard";
import { event_list } from "../assests/assests.js";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";

import { useContext } from "react";
import { StoreContext } from "../context/storeContext.jsx";

const Event = () => {
  const Events = ["cultural", "Tech", "Non-Tech"];
  const Options = ["Paid", "Unpaid"];
  const { eventList } = useContext(StoreContext);
  const itemsPerPage = 9; // Define how many items to show per page

  // states
  const [category, setCategory] = useState(null);
  const [paidOption, setPaidOption] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // For pagination

  // Filter events based on both category and price
  const filteredEvents = eventList.filter((item) => {
    const categoryMatch = category === null || category === item.category;
    const paidMatch =
      paidOption === "Paid"
        ? item.price > 0
        : paidOption === "Unpaid"
        ? item.price === 0
        : true;
    return categoryMatch && paidMatch;
  });

  // Calculate the total number of pages
  const pageCount = Math.ceil(filteredEvents.length / itemsPerPage);

  // Slice the filtered events for the current page
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="p-5 ">
      <p className="font-Poppins bg-green-300 text-normal text-slate-700 font-medium p-2 shadow-md shadow-green-800">
        🔖Campus Fete brings all your campus events to one place. Find exciting
        activities, register for events, and create unforgettable memories with
        just a few clicks.
      </p>
      <div
        className="flex flex-col justify-center items-center max-sm:mt-9 p-8 max-sm:p-1 border-2 mt-6 border-slate-200 rounded-2xl"
        id="UpcomingEvent"
      >
        {/* Filters */}
        <div className="flex justify-end gap-3 items-center w-full">
          {/* Paid/Unpaid Filter */}
          <Autocomplete
            value={paidOption}
            onChange={(event, newValue) => setPaidOption(newValue)} // Corrected
            className="w-[190px] max-sm:w-[150px] max-sm:h-10 max-sm:flex max-sm:justify-center max-sm:items-center max-sm:p-4"
            options={Options}
            renderInput={(params) => (
              <TextField {...params} label="Sort By price" />
            )}
          />

          {/* Category Filter */}
          <Autocomplete
            value={category}
            onChange={(event, newValue) => setCategory(newValue)} // Corrected
            className="w-[190px] max-sm:w-[150px] max-sm:h-10 max-sm:flex max-sm:justify-center max-sm:items-center max-sm:p-4"
            options={Events}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />
        </div>

        {/* Displaying Filtered and Paginated Events */}
        <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-6 w-full mt-10">
          {paginatedEvents.map((item, index) => (
            <UpcomingCard
              key={index}
              id={item._id}
              venue={item.venue}
              title={item.title}
              image={item.image}
              description={item.description}
              category={item.category}
              price={item.price}
              date={item.date}
            />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-5">
        <Pagination
          count={pageCount} // Total pages
          page={currentPage} // Current active page
          onChange={handlePageChange} // Page change handler
          variant="outlined"
          color="secondary"
        />
      </div>
    </div>
  );
};

export default Event;
