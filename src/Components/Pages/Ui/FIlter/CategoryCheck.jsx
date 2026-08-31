import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../../Api/axiosInstance";
import { RiArrowDropUpLine } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from "react";

const CategoryCheck = ({ onChange }) => {
  const [filterCategories, setFilterCategories] = useState([]);
  const [isHide, setHide] = useState(true);
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  function handleCategoryChange(e) {
    const { value, checked } = e.target;
    const updated = checked
      ? [...filterCategories, value]
      : filterCategories.filter((item) => item !== value);
    setFilterCategories(updated);
    onChange(updated);
  }

  // console.log(categories)

  return (
    <div className="py-3 flex flex-col gap-3">
      <button
        className="text-[#2D3447] font-bold text-[14px] md:text-lg flex items-center justify-between w-full md:w-40"
        onClick={() => setHide((prev) => !prev)}
      >
        Category
        {isHide ? (
          <RiArrowDropDownLine className="text-xl md:text-2xl" />
        ) : (
          <RiArrowDropUpLine className="text-xl md:text-2xl" />
        )}
      </button>
      {!isHide && (
        <ul className="flex flex-col gap-2 transition-all transition-discrete duration-300 translate-y 0 opacity-100 starting:opacity-0 starting:-translate-y-2">
          {categories?.map((item, index) => {
            return (
              <li key={index} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id={item.slug}
                  name={item.slug}
                  value={item.slug}
                  onChange={handleCategoryChange}
                />
                <label
                  htmlFor={item.slug}
                  className="font-medium text-[#656B7B] text-[13px]"
                >
                  {item.name}
                </label>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default CategoryCheck;
