import { useQuery } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { getCategories } from "../Api/axiosInstance";

const Categories = () => {
  const navigate = useNavigate();
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  //   console.log(categories);

  const handleNavigate = (slug) => {
    navigate(`/categories/${slug}`);
  };

  return (
    <section className="w-full">
      <div className="w-full max-w-6xl p-2 m-auto">
        <ul className="grid grid-cols-2 gap-3">
          {categories &&
            categories.map((category, index) => {
              return (
                <li
                  key={index}
                  className="shadow-xl border border-blue-200 hover:scale-103 not-first:inline-block text-slate-700 group p-2 px-3 rounded-2xl hover:-translate-y-1 transition-all"
                  onClick={() => handleNavigate(category.slug)}
                >
                  {category.name}
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
};

export default Categories;
