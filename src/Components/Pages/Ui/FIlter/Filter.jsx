import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import CategoryCheck from "./CategoryCheck"
import PriceRange from "./PriceRange"
import Rating from "./Rating"

const Filter = ({ setCategory, setPriceRange, setRating }) => {
  const [isHide, setHide] = useState(false);
  return (
    <>
      <button
        onClick={() => setHide((prev) => !prev)}
        className="p-2 md:hidden"
      >
        <CiFilter className="text-xl" />{" "}
      </button>
      <section
        className={`bg-[#F2F3FF] p-5 rounded-2xl ${isHide ? "block" : "hidden"} md:block transition-discrete starting:opacity-0 starting:-translate-1 opacity-100 translate-0 transition-all`}
      >
        <h1 className="md:text-xl font-bold pb-2 border-b border-slate-200 hidden md:block">
          Filter
        </h1>
        {setCategory && <CategoryCheck onChange={(value) => setCategory(value)} />}
        <PriceRange onChange={(value) => setPriceRange(value)} />
        <Rating onChange={(value) => setRating(value)} />
      </section>
    </>
  );
};

export default Filter;
