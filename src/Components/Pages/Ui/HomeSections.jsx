import { NavLink } from "react-router-dom";
import ProductCard from "./Product/ProductCard";
import { SkeletonLosder } from "./SekeltonLoader";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../Api/axiosInstance";

const HomeSections = ({slug, title}) => {
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
      <h1 className="text-center text-xl font-bold">Latest {title}</h1>
      {isLoading ? <SkeletonLosder/> : (
        <ul className="overflow-auto flex justify-between gap-3 py-3">
          {category?.products.map((pro, index) => {
            return (
              <li key={index} className="w-50">
                <ProductCard product={pro} />
              </li>
            );
          })}
        </ul>
      )}
      <NavLink
        className={"text-center block text-xs text-primary "}
        to={`/categories/${slug}`}
      >
        View All
      </NavLink>
    </div>
  );
};

export default HomeSections;
