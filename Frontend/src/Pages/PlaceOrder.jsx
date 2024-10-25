import { useContext } from "react";
import { StoreContext } from "../context/storeContext";
const PlaceOrder = () => {
  const { GetTotalCartAmount, SalesTax, Grand_Total } =
    useContext(StoreContext);
  return (
    <form>
      <h1 className=" font-Poppins text-2xl font-semibold text-center mt-4">
        Booking Information🔖
      </h1>
      <div className="flex p-6 mt-3  justify-around ">
        {/* information part  */}
        <div className=" flex flex-col gap-4 p-8 w-[400px] bg-green-200 rounded-2xl">
          <h3 className=" text-xl font-Poppins font-semibold mb-2">
            Personal Details🤗
          </h3>
          <input
            className="py-2 px-3 font-Poppins text-normal rounded-lg "
            type="text"
            placeholder="First Name"
            required
          />

          <input
            className="py-2 px-3 font-Poppins text-normal rounded-lg "
            type="text"
            placeholder="Last Name"
            required
          />

          <input
            className="py-2 px-3 font-Poppins text-normal rounded-lg "
            type="email"
            placeholder="email"
            required
          />

          <input
            className="py-2 px-3 font-Poppins text-normal rounded-lg "
            type="tel"
            placeholder="Phone"
            required
          />
          <p className=" text-sm font-normal font-Poppins mb-2 text-slate-500">
            ⚡These details needed to generate a ticket fill{" "}
            <span className="ml-5">them correctly.</span>
          </p>
        </div>
        {/* Payment details */}
        <div className="mt-8 grid justify-end">
          <div className="flex flex-col gap-7 w-[450px]">
            <p className=" font-Poppins text-base font-medium">
              SubTotal :{" "}
              <span className="text-slate-500 ml-2 font-normal">
                ₹ {GetTotalCartAmount()}
              </span>
            </p>
            <hr className="h-[1px] bg-slate-200" />
            <p className=" font-Poppins text-base font-medium">
              Sales Tax (2%) :{" "}
              <span className="text-slate-500 ml-2 font-normal">
                ₹ {SalesTax()}
              </span>
            </p>
            <hr className="h-[1px] bg-slate-200" />

            <p className=" font-Poppins text-base font-medium">
              Grand Total :{" "}
              <span className=" ml-2 text-slate-500 font-normal">
                ₹ {Grand_Total()}
              </span>
            </p>
            <hr className="h-[1px] bg-slate-200" />
            <button className="p-4 mt-6 text-normal font-Poppins font-semibold text-white bg-black">
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
