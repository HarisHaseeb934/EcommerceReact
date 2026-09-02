import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import StarRating from "./Ui/FIlter/StarRating";
import { CiHeart } from "react-icons/ci";
import { removeFromFavourites } from "../Store/Favourites/favouritesSlice";

const Favourites = () => {
  const { favouritesProducts } = useSelector((state) => state.favourites);
  const dispatch = useDispatch();
  return (
    <section className="w-full bg-surface-container-low text-on-surface min-h-full">
      <div className="max-w-7xl w-full mx-auto flex flex-col p-margin-mobile md:p-margin-desktop gap-stack-lg">
        <div>
          <h1 className="text-display-lg-mobile md:text-display-lg font-bold">
            Your Favourites
          </h1>
          <p className="text-on-surface-variant text-body-base mt-1">
            {favouritesProducts.length} items in your favourites.
          </p>
        </div>

        <ul className="flex flex-wrap gap-stack-md justify-center">
          {favouritesProducts.map((fav, index) => {
            const {
              id,
              thumbnail,
              title,
              brand,
              rating,
              reviews,
              price,
              discountPercentage,
            } = fav;
            return (
              <li
                key={index}
                className="bg-surface-container-lowest w-50 shadow-sm hover:shadow-md transition-shadow rounded-xl group"
              >
                <div className="overflow-hidden aspect-4/5 w-full relative rounded-t-xl">
                  <img
                    src={thumbnail}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-all"
                  />
                  <button
                    className={`absolute bottom-3 right-3 flex rounded-full p-2 bg-surface-container-lowest text-on-surface-variant hover:text-primary transition-colors`}
                    onClick={() => dispatch(removeFromFavourites(fav))}
                  >
                    <CiHeart className={`hover:scale-105`} />
                  </button>
                </div>
                <div className="p-3 flex flex-col gap-stack-sm">
                  <h2 className="text-body-base text-on-surface font-semibold line-clamp-1">
                    {title}
                  </h2>
                  <div className="flex items-center gap-1 text-body-sm text-on-surface-variant">
                    <StarRating
                      initialRating={rating}
                      size={20}
                      className="text-tertiary"
                    />
                    <span>({reviews.length})</span>
                  </div>
                  <h2 className="font-semibold text-body-base text-on-surface">
                    ${price}
                  </h2>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Favourites;
