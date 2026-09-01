import { IoIosSearch } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { IoCartOutline, IoPersonOutline, IoClose } from "react-icons/io5";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getSearchData } from "../../Api/axiosInstance";
import { useDebounce } from "../../hooks/useDebounce";
import ProductCard from "../Ui/Product/ProductCard";
import { CiSearch } from "react-icons/ci";

const Header = () => {
  const { products } = useSelector((state) => state.cart);
  const { favouritesProducts } = useSelector((state) => state.favourites);
  const cartQuantity = products?.length;
  const favQuantity = favouritesProducts?.length;

  const [isShowsearch, isShowsetSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  const debounceValue = useDebounce(search.trim(), 500);

  const {
    data: searchResult,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["search", debounceValue],
    queryFn: () => getSearchData(debounceValue),
    enabled: !!debounceValue,
  });

  function handleSearchSubmit(e) {
    e.preventDefault();
  }

  const handleClear = () => {
    setSearch("");
    setIsOpen(false);
    isShowsetSearch(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!searchRef.current.contains(event.target)) {
        setIsOpen(false);
        isShowsetSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full sticky top-0 z-50 p-3 backdrop-blur-xl bg-white/80 border-b border-slate-100 flex flex-col gap-4 lg:gap-3">
      <div className="w-full max-w-[90%] m-auto flex justify-between items-center relative">
        <NavLink className="flex items-center justify-center gap-3" to="/">
          <img src="Logo.png" alt="ApexStore Logo" className="w-7 md:w-10" />
          <h1 className="sm:text-lg md:text-2xl font-bold">ApexStore</h1>
        </NavLink>

        <div
          ref={searchRef}
          className={`${isShowsearch ? "absolute" : "hidden"} top-30 right-0 md:block md:static md:w-auto md:flex-1 md:max-w-md md:mx-6 z-50`}
        >
          <form
            onSubmit={handleSearchSubmit}
            className="bg-slate-100 p-1 px-3 md:p-2 rounded-3xl flex items-center w-full border border-slate-200 focus-within:border-blue-500 transition-colors"
          >
            <input
              type="text"
              name="search"
              className="outline-none px-2 text-xs md:text-sm w-full bg-transparent text-slate-800"
              placeholder="Search Products..."
              onChange={(e) => {
                setSearch(e.target.value);
                setIsOpen(true);
              }}
              value={search}
              onFocus={() => setIsOpen(true)}
            />
            {search ? (
              <button
                type="button"
                onClick={handleClear}
                className="text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                <IoClose className="text-xl" />
              </button>
            ) : (
              <IoIosSearch className="text-xl" />
            )}
          </form>

          {isOpen && debounceValue && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50 max-h-[80vh] flex flex-col">
              {!isLoading &&
                !isError &&
                searchResult?.products?.length === 0 && (
                  <p className="p-6 text-center text-slate-500 text-sm">
                    No products found for "{debounceValue}"
                  </p>
                )}

              {searchResult?.products?.length > 0 && (
                <div className="p-4 overflow-x-auto">
                  <ul className="flex gap-4 pb-2">
                    {searchResult.products.map((product) => (
                      <li
                        key={product.id}
                        className="min-w-[200px] max-w-[220px] flex-shrink-0"
                        onClick={() => setIsOpen(false)}
                      >
                        <ProductCard product={product} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-5 md:gap-7">
          <button
            className="md:hidden"
            onMouseDown={(e) => {
              e.stopPropagation();
              isShowsetSearch((prev) => !prev);
            }}
          >
            <CiSearch className="text-[16px]"/>
          </button>
          <NavLink className="relative" to="/favourites">
            {favQuantity > 0 && (
              <span className="absolute -top-2 -right-2 size-4 text-[11px] bg-blue-500 rounded-full text-white md:size-5 flex items-center justify-center font-bold">
                {favQuantity}
              </span>
            )}
            <CiHeart className="text-[16px] md:text-xl" />
          </NavLink>
          <NavLink className="relative" to="/cart">
            {cartQuantity > 0 && (
              <span className="absolute -top-2 -right-2 size-4 text-[11px] bg-blue-500 rounded-full text-white md:size-5 flex items-center justify-center font-bold">
                {cartQuantity}
              </span>
            )}
            <IoCartOutline className="text-[16px] md:text-xl" />
          </NavLink>
          <NavLink
            className="bg-primary p-1 md:p-1.5 text-xl text-white rounded-full hover:opacity-90 transition-opacity"
            to="/login"
          >
            <IoPersonOutline className="text-[16px] md:text-lg" />
          </NavLink>
        </div>
      </div>

      <div className="w-full max-w-[90%] m-auto px-3">
        <nav className="flex gap-12 text-xs md:text-sm justify-center md:justify-start">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? "text-primary font-semibold scale-105" : "font-semibold text-slate-500 hover:text-slate-800"} transition-all`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `${isActive ? "text-primary font-semibold scale-105" : "font-semibold text-slate-500 hover:text-slate-800"} transition-all`
            }
          >
            Shop All
          </NavLink>
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              `${isActive ? "text-primary font-semibold scale-105" : "font-semibold text-slate-500 hover:text-slate-800"} transition-all`
            }
          >
            Categories
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
