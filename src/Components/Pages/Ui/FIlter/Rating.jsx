import { useState } from "react";
import { RiArrowDropUpLine } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import StarRating from "./StarRating";

const Rating = ({onChange}) => {
  const [isHide, setHide] = useState(true);
  return (
    <div className="py-3">
      <button
        className="text-[#2D3447] font-bold text-[14px] md:text-lg flex items-center justify-between w-full md:w-40"
        onClick={() => setHide((prev) => !prev)}
      >
        Rating
        {isHide ? (
          <RiArrowDropDownLine className="text-xl md:text-2xl" />
        ) : (
          <RiArrowDropUpLine className="text-xl md:text-2xl" />
        )}
      </button>
    {!isHide && (
        <div className="my-2 transition transition-discrete translate-y-0 opacity-100 starting:-translate-y-2 starting:opacity-0">
            <div>
                <StarRating initialRating={5} onChange={(value) => onChange(value)}/>
            </div>
        </div>
      )}
    </div>
  );
};

export default Rating;
