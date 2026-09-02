import { NavLink } from "react-router-dom";
import ProductCard from "./Product/ProductCard";
import { SkeletonLosder } from "./Loader/SekeltonLoader";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../Api/axiosInstance";

const HomeSections = ({ slug, title }) => {
  const {
    data: category,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["category", slug],
    queryFn: () => getCategory(slug),
  });
  return (
    <div className="max-w-7xl m-auto w-full p-2 mt-7 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="bg-slate-600 h-[1px] flex-1"></div>
        <h1 className="text-center text-xl font-bold">
          Latest<span className="px-2"> {title}</span>
        </h1>
        <div className="bg-slate-600 h-[1px] flex-1"></div>
      </div>
      {isError && <p>{error.message}</p>}
      {isLoading ? (
        <SkeletonLosder />
      ) : (
        <ul className="overflow-auto flex gap-3 py-3 snap-both">
          {category?.products.map((pro, index) => {
            return (
              <li key={index} className="snap-center">
                <ProductCard product={pro} w="md:w-60" />
              </li>
            );
          })}
        </ul>
      )}
      <NavLink
        className={
          "text-center block text-xs md:text-sm lg:text-md bg-primary w-30 py-1 md:py-2 md:w-40 m-auto text-white"
        }
        to={`/categories/${slug}`}
      >
        View All
      </NavLink>
    </div>
  );
};

export default HomeSections;
