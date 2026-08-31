import { IoIosSearch } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getSearchData } from "../../Api/axiosInstance";
import { useDebounce } from "../../hooks/useDebounce";
import ProductCard from "../Ui/Product/ProductCard";

const Header = () => {
  const { products } = useSelector((state) => state.cart);
  const { favouritesProducts } = useSelector((state) => state.favourites);
  const cartQuantity = products.length;
  const favQuantity = favouritesProducts.length;

  const [search, setSearch] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    console.log(search);
  }

  const debounceValue = useDebounce(search, 500);

  const {
    data: searchResult,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["search", debounceValue],
    queryFn: () => getSearchData(debounceValue),
    enabled: !!debounceValue,
  });

  // function debounce(func, delay){
  //   let timer;
  //   return (...args) => {
  //     clearTimeout(timer);
  //     timer = setTimeout(() => {func.apply(this.args)},delay)
  //   }
  // }

  console.log(searchResult);

  return (
    <header className="w-full sticky top-0 z-50 p-3 md:h-auto h-33 backdrop-blur-xl relative">
      <div className="w-full max-w-7xl m-auto flex justify-between items-center relative">
        <NavLink className="flex items-center justify-center gap-3" to={"/"}>
          <img src="Logo.png" alt="" width="25px" />
          <h1 className="sm:text-lg md:text-2xl font-bold">ApexStore</h1>
        </NavLink>

        <form
          className={`bg-slate-200 nav p-2 rounded-3xl md:w-xs`}
          onClick={handleSearch}
        >
          <input
            type="text"
            name="search"
            className="outline-none px-2 text-md w-full"
            placeholder="Search Products..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button type="button">
            <IoIosSearch className="text-xl" />
          </button>
        </form>
        <div className="flex items-baseline text-2xl gap-5 md:gap-7">
          <NavLink className={`relative`} to={"/favourites"}>
            {favQuantity > 0 && (
              <span className="absolute -top-2 size-4 -right-2 text-[12px] bg-blue-500 rounded-full text-white md:size-5 flex items-center justify-center">
                {favQuantity}
              </span>
            )}
            <CiHeart />
          </NavLink>
          <NavLink className={`relative`} to={"/cart"}>
            {cartQuantity > 0 && (
              <span className="absolute -top-2 size-4 -right-2 text-[12px] bg-blue-500 rounded-full text-white md:size-5 flex items-center justify-center">
                {cartQuantity}
              </span>
            )}
            <IoCartOutline />
          </NavLink>
          <NavLink
            className="bg-blue-700 p-1 text-xl text-white rounded-full"
            to={"/profile"}
          >
            <IoPersonOutline />
          </NavLink>
        </div>
      </div>
      <div className="w-full max-w-7xl m-auto my-2 px-3">
        <nav className="flex gap-12 text-[13px] sm:text-base justify-center md:justify-start">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `${isActive ? "text-blue-500 scale-110 font-bold" : "font-bold text-slate-500"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to={"/shop"}
            className={({ isActive }) =>
              `${isActive ? "text-blue-500 scale-110 font-bold" : "font-bold text-slate-500"}`
            }
          >
            Shop All
          </NavLink>
          <NavLink
            to={"/categories"}
            className={({ isActive }) =>
              `${isActive ? "text-blue-500 scale-110 font-bold" : "font-bold text-slate-500"}`
            }
          >
            Categories
          </NavLink>
        </nav>
      </div>

      {searchResult && (
        <div className="absolute min-h-full w-full bg-white top-33 md:top-26 left-0 transition-discrete starting:opacity-0 opacity-100 starting:-translate-y-100 translate-0 ease-in-out duration-200">
          {searchResult.products.length === 0 ? (
            <p className="max-w-7xl w-full p-3 text-black ">Search Results are not Found....</p>
          ) : (
            <ul className="max-w-7xl w-full p-3 flex overflow-scroll gap-3">{
                searchResult.products.map((product, index) => {
                  return <li className="">
                   <ProductCard product = {product} />
                   </li>
                })
              }</ul>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
