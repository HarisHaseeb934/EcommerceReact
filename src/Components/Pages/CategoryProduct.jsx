import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../Api/axiosInstance";
import Filter from "./Ui/FIlter/Filter";
import { useParams } from "react-router-dom";
import { useState } from "react";
import ProductCard from "./Ui/Product/ProductCard";
import { SkeletonLosder } from "./Ui/Loader/SekeltonLoader";

const CategoryProduct = () => {
  const { slug } = useParams();
  const [priceRange, setPriceRange] = useState(100000);
  const [rating, setRating] = useState(5);
  const {
    data: category,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["category", slug],
    queryFn: () => getCategory(slug),
  });

  if (isLoading) return <SkeletonLosder />;
  if (isError) return <h1>{error.message}</h1>;

  function filterPrice(product) {
    if (priceRange >= 0) return product.price <= priceRange;
    return product;
  }

  function filterRating(product) {
    if (rating) return product.rating <= rating;
    return product;
  }

  const filterproduct = category?.products.filter(
    (product) => filterPrice(product) && filterRating(product),
  );

  return (
    <section className="w-full">
      <div className="max-w-6xl w-full m-auto flex flex-col md:flex-row gap-4 p-3">
        <Filter setPriceRange={setPriceRange} setRating={setRating} />
        <div className="w-full p-3">
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 justify-center place-items-center">
            {category &&
              filterproduct.map((product) => {
                return (
                  <li key={product.id}>
                    <ProductCard product = {product} />
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CategoryProduct;
