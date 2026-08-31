import { useState } from "react";
import { RiArrowDropUpLine } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";

const PriceRange = ({onChange}) => {
  const [isHide, setHide] = useState(true);
  const [range, setRange] = useState(100000);

  function handleRange(e) {
    setRange(Number(e.target.value));
    onChange?.(Number(e.target.value))
  }

  return (
    <div className="py-3">
      <button
        className="text-[#2D3447] font-bold text-[14px] md:text-lg flex items-center justify-between w-full md:w-40"
        onClick={() => setHide((prev) => !prev)}
      >
        Price Range
        {isHide ? (
          <RiArrowDropDownLine className="text-xl md:text-2xl" />
        ) : (
          <RiArrowDropUpLine className="text-xl md:text-2xl" />
        )}
      </button>
      {!isHide && (
        <div className="transition-all transition-discrete duration-300 translate-y-0 opacity-100 starting: starting:opacity-0 starting:-translate-y-2">
          <div className="flex">
            <div>1$</div>
            -
            <div>{range}$</div>
          </div>
          <div>
            <input
              type="range"
              className="w-full"
              max={100000}
              min={0}
              value={range}
              step={25}
              onChange={handleRange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceRange;
