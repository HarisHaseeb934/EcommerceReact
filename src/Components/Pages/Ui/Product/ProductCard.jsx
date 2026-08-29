import { FaCartPlus } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import Star from "../Star";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

const ProductCard = ({
  id,
  thumbnail,
  title,
  brand,
  rating,
  reviews,
  price,
  discountPercentage,
}) => {

  const navigate = useNavigate();

  function original(price, discount){
    const sub = 100 - discount;
    const decimal = sub / 100;
    return (price / decimal).toFixed(2);
  }

  const handleNavigate = (id) => {
    navigate(`/shop/product/${id}`)
  }

  return (
    <div className="group flex w-40 h-90 md:h-auto md:w-auto flex-col hover:-translate-y-1 transition-all rounded-xl hover:shadow-lg shadow-md relative overflow-hidden" onClick={() => handleNavigate(id)}>
     {discountPercentage && <div className="absolute top-3 z-10 right-3 bg-green-800 rounded-2xl text-white p-1 px-2 text-xs font-bold">
        discount
      </div>}
      <div className="aspect-[4/5] w-full overflow-hidden relative">
        <img
          src={thumbnail}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button className="absolute bottom-3 right-3 bg-white flex rounded-full p-2 hover:text-blue-600">
          <CiHeart className="hover:scale-105" />
        </button>
      </div>
      <div className="p-3 flex flex-col gap-1">
        {brand && <div className="text-[#7A788A] text-sm font-semibold">{brand}</div>}
        <div className="group-hover:text-blue-600 font-semibold text-md">
          {title.length > 20 ? title.slice(0,21) + "..." : title}
        </div>
        <div className="flex gap-1 items-center">
          <Star className={`text-amber-900`} />
          <span className="text-[14px] font-semibold">
            {rating}
          </span>
          <span className="text-[14px] text-[#7A788A]">
            ({reviews.length})
          </span>
        </div>
        <div className="flex justify-between items-center py-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[16px]">
              ${price}
            </span>
            {discountPercentage > 0   && <span className="text-[13px] text-[#7A788A] line-through">
              ${original(price, discountPercentage)}
            </span>}
          </div>
          <button className="bg-blue-700 text-white rounded-full p-2 flex justify-center items-center cursor-pointer">
            <FaCartPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
