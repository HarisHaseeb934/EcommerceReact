import { useEffect, useState } from "react";
import Filter from "./Ui/FIlter/Filter";
import ProductCard from "./Ui/Product/ProductCard";
import { getProducts } from "../Api/axiosInstance";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { SkeletonLosder } from "./Ui/SekeltonLoader";
import Alert from "./Ui/Alert"

const Shop = () => {
  const [category, setCateogry] = useState([]);
  const [priceRange, setPriceRange] = useState(100000);
  const [rating, setRating] = useState(5);
  const [skip, setSkip] = useState(0);

  // const filter = {category, priceRange, rating, skip};

  const [alreadyAdded, setAlreadyAdded] = useState({
    message: "",
    className: "",
    show: false,
  });

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`products`, skip],
    queryFn: () => getProducts(skip),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [skip]);

  // console.log(category)
  // console.log(priceRange)
  // console.log(rating)

  function handleSkipForward() {
    setSkip((prev) => prev + 10);
  }
  function handleSkipPrevious() {
    setSkip((prev) => prev - 10);
  }

  const filterPrice = (product) => {
    if (priceRange >= 0) return product.price <= priceRange;
    return product;
  };

  const filterRating = (product) => {
    if (rating) return product.rating <= rating;
    return product;
  };

  const filterCategory = (product) => {
    if (category.length > 0) return category.includes(product.category);
    return product;
  };

  const filter = products?.products.filter(
    (product) =>
      filterPrice(product) && filterRating(product) && filterCategory(product),
  );

  // console.log(products);
  
  if (isLoading) return <SkeletonLosder />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <section className="w-full">
      {alreadyAdded.show && <Alert message = {alreadyAdded.message} className = {alreadyAdded.className}/>}
      <div className="max-w-[90%] w-full m-auto flex flex-col md:flex-row gap-4 md:p-3">
        <Filter
          setCategory={setCateogry}
          setPriceRange={setPriceRange}
          setRating={setRating}
        />
        <div className="w-full p-3">
          {filter.length > 0 ? (
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 justify-center place-items-center">
              {filter.map((product) => {
                return (
                  <li key={product.id}>
                    <ProductCard product={product} setAlreadyAdded={setAlreadyAdded} alreadyAdded={alreadyAdded}/>
                  </li>
                );
              })}
            </ul>
          ) : (
            <h1 className="whitespace-nowrap text-xl text-red-400">
              No{" "}
              {category
                .map(
                  (category) =>
                    category.slice(0, 1).toUpperCase() + category.slice(1),
                )
                .join(", ")}{" "}
              Product Found
            </h1>
          )}
        </div>
      </div>
      <div className="flex m-auto w-20 gap-5 my-5">
        <button
          className="bg-indigo-600 text-white p-1 rounded-full"
          disabled={skip <= 0 ? true : false}
          onClick={handleSkipPrevious}
        >
          <IoIosArrowBack className="text-xl" />
        </button>
        <p>{skip / 10 + 1}</p>
        <button
          className="bg-indigo-600 text-white p-1 rounded-full"
          onClick={handleSkipForward}
        >
          <IoIosArrowForward className="text-xl" />
        </button>
      </div>
    </section>
  );
};

export default Shop;
