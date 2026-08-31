import { FaCartPlus } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import Star from "../Star";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Store/Cart/cartSlice";
import { addToFavourites, removeFromFavourites } from "../../../Store/Favourites/favouritesSlice";

const ProductCard = ({ product, setAlreadyAdded, alreadyAdded }) => {
  const {
    id,
    thumbnail,
    title,
    brand,
    rating,
    reviews,
    price,
    discountPercentage,
  } = product;

  const navigate = useNavigate();

  const { products } = useSelector((state) => state.cart);
  const { favouritesProducts } = useSelector((state) => state.favourites);
  const dispatch = useDispatch();

  function original(price, discount) {
    const sub = 100 - discount;
    const decimal = sub / 100;
    return (price / decimal).toFixed(2);
  }

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    const isIteminCart = products.some((pro) => pro.id === product.id);
    if (isIteminCart) {
      setAlreadyAdded({
        message: "This product is already in your cart",
        className: "border-amber-500 text-amber-700",
        show: true,
      });
    } else {
      dispatch(addToCart({ ...product, quantity: 1 }));
      setAlreadyAdded({
        message: "Added to cart successfully!",
        className: "border-emerald-500 text-emerald-600",
        show: true,
      });
    }
  };

  const handleAddToFavourites = (e, product) => {
    e.stopPropagation();
    const isIteminFavourites = favouritesProducts.some(
      (pro) => pro.id === product.id,
    );
    if (isIteminFavourites) {
      dispatch(removeFromFavourites(product));
      setAlreadyAdded({
        message: "Rmove from favourites successfully!",
        className: "border-emerald-500 text-emerald-600",
        show: true,
      });
    }else {
      dispatch(addToFavourites(product));
      setAlreadyAdded({
        message: "Added to favourites successfully!",
        className: "border-emerald-500 text-emerald-600",
        show: true,
      });
    }
  };

  useEffect(() => {
    if (!alreadyAdded?.show) return;

    let timer = setTimeout(() => {
      setAlreadyAdded({ message: "", className: "", show: false });
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  });

  const handleNavigate = (e, id) => {
    e.stopPropagation();
    navigate(`/shop/product/${id}`);
  };

  // console.log("Fav" + favouritesProducts);

  return (
    <div
      className="group flex w-40 md:w-auto flex-col hover:-translate-y-1 transition-all rounded-xl hover:shadow-lg shadow-md relative overflow-hidden"
      onClick={(e) => handleNavigate(e, id)}
    >
      {discountPercentage && (
        <div className="absolute top-3 z-10 right-3 bg-green-800 rounded-2xl text-white p-1 px-2 text-[8px] md:text-xs font-medium">
          discount
        </div>
      )}
      <div className="md:aspect-4/5 w-full overflow-hidden relative">
        <img
          src={thumbnail}
          alt=""
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button
          className={`absolute bottom-3 right-3 flex rounded-full p-2 hover:text-primary  ${favouritesProducts.some((fav) => fav.id === product.id) ? "bg-red-400 text-white" : "bg-transparent text-black"}`}
          onClick={(e) => handleAddToFavourites(e, product)}
        >
          <CiHeart className={`hover:scale-105`} />
        </button>
      </div>
      <div className="p-3 flex flex-col gap-1">
        {brand && (
          <div className="text-[#7A788A] text-[10px] md:text-md font-semibold">{brand}</div>
        )}
        <div className="group-hover:text-primary font-semibold text-[10px] md:text-[14px] line-clamp-1">
          {/* {title.length > 20 ? title.slice(0, 21) + "..." : title} */}
          {title}
        </div>
        <div className="flex gap-1 items-center">
          <Star className={`text-amber-900`} size={14} />
          <span className="text-[10px] md:text-[14px] font-semibold">{rating}</span>
          <span className="text-[10px] md:text-[14px] text-[#7A788A]">({reviews.length})</span>
        </div>
        <div className="flex justify-between items-center py-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[10px] md:text-base">${price}</span>
            {discountPercentage > 0 && (
              <span className="text-[10px] md:text-[14px] text-[#7A788A] line-through">
                ${original(price, discountPercentage)}
              </span>
            )}
          </div>
          <button
            className="bg-primary text-white rounded-full p-1 md:p-2 flex justify-center items-center cursor-pointer"
            onClick={(e) => handleAddToCart(e, product)}
          >
            <FaCartPlus className="text-[10px] md:text-[14px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
