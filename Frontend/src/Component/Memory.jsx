import { Mem_list } from "../assests/assests";
import MemCard from "./MemCard";

const Memory = () => {
  return (
    <div className=" p-8 mt-16 ">
      <h1 className=" text-[36px] font-Poppins font-semibold    inline-block ">
        Events Memories
      </h1>
      <p className="font-Poppins text-base leading-5  text-slate-600 tracking-wide text-pretty mt-4">
        "Relive the moments that made every event unforgettable! Our Event
        Memories capture the excitement, energy, and joy of each gathering,
        preserving the highlights in a visual journey. From spontaneous smiles
        to celebratory cheers, these memories ensure that no moment is left
        behind. Explore the gallery and experience the events all over again!"
        {"      "}
        <a
          className="text-green-800 font-Poppins underline underline-offset-2 decoration-green-900 hover:bg-green-200 transition-colors ease-out delay-100"
          href="#"
          target="_blank"
        >
          See More...
        </a>
      </p>

      <div className="  flex justify-center items-center gap-10 ">
        {Mem_list.map((item, index) => {
          if (index < 3) {
            return <MemCard key={item.id} photo={item.image} index={index} />;
          }
        })}
      </div>
    </div>
  );
};

export default Memory;
