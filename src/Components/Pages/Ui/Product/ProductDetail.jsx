import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { FiTruck } from "react-icons/fi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdOutlineAssignmentReturn } from "react-icons/md";
import { MdOutlineSupportAgent } from "react-icons/md";
import StarRating from "../FIlter/StarRating";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../../Api/axiosInstance";
import { SkeletonLosder } from "../SekeltonLoader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Store/Cart/cartSlice";
import Alert from "../Alert";

const ProductDetail = () => {
  const { id } = useParams();

  const [isReview, setIsReviews] = useState(true);
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });
  const [selectedImg, setSelectedImg] = useState();

  useEffect(() => {
    setSelectedImg(product?.images[0]);
  }, [product?.images]);

  // console.log(product);

  if (isLoading) return <SkeletonLosder />;

  return (
    <section className="w-full bg-slate-50/50 py-10 px-4 flex flex-col gap-20 relative overflow-x-hidden">
      <div className="max-w-6xl w-full m-auto flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div className="w-full aspect-[4/5] transition-all cursor-zoom-in group overflow-hidden rounded-xl">
            <img
              src={selectedImg}
              alt=""
              className="w-full h-full object-cover hover:scale-105 duration-500 transition-all "
            />
          </div>
          <div className="flex gap-2">
            {product?.images.map((img, index) => {
              return (
                <button
                  key={index}
                  onClick={() => setSelectedImg(img)}
                  className={`overflow-hiddden aspect-square size-20 rounded-xl  ${selectedImg === img ? "border-indigo-500 border" : "opacity-80 hover:opacity-100"}`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover rounded-xl"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <Detail product={product} />
        </div>
      </div>

      <div className="max-w-6xl w-full m-auto flex flex-col">
        <div className="flex gap-5">
          <button
            className={`flex items-center gap-4 py-1 md:py-2 px-3 ${isReview ? "bg-primary text-white rounded-3xl" : "border-primary border rounded-3xl"}`}
            onClick={() => setIsReviews((prev) => !prev)}
          >
            <span className="text-xs md:text-md">
              Reviews
            </span>
            <span
              className={`text-[12px] md:text-sm font-semibold bg-sky-100 size-4 md:size-6 flex items-center justify-center rounded-full ${isReview ? "text-black" : ""}`}
            >
              {product?.reviews.length}
            </span>
          </button>
          <button
            className={`flex items-center gap-4 py-2 px-3 text-xs md:text-md ${isReview ? "border-primary border rounded-3xl" : "bg-primary text-white rounded-3xl"}`}
            onClick={() => setIsReviews((prev) => !prev)}
          >
            Specification
          </button>
        </div>

        {isReview ? (
          <Reviews reviews={product?.reviews} />
        ) : (
          <Specification {...product} />
        )}
      </div>
    </section>
  );
};

const Detail = ({ product }) => {
  const {
    id,
    brand,
    rating,
    reviews,
    title,
    description,
    price,
    discountPercentage,
    availabilityStatus,
    shippingInformation,
    warrantyInformation,
    returnPolicy,
    stock,
  } = product;

  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState({
    message: "",
    className: "",
    show: false,
  });

  const { products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  function original(price, discount) {
    const sub = 100 - discount;
    const decimal = sub / 100;
    return (price / decimal).toFixed(2);
  }

  useEffect(() => {
    if (!alreadyAdded.show) return;
    const timer = setTimeout(() => {
      setAlreadyAdded((prev) => ({ ...prev, show: false }));
    }, 2000);

    return () => clearTimeout(timer);
  }, [alreadyAdded.show]);

  const handleAddToCart = () => {
    const isItemInCart = products.some((item) => item.id === id);

    if (isItemInCart) {
      setAlreadyAdded({
        message: "This product is already in your cart",
        className: "border-amber-500 text-amber-700",
        show: true,
      });
    } else if (quantity > stock) {
      setAlreadyAdded({
        message: "Requested quantity exceeds available stock",
        className: "border-red-500 text-red-600",
        show: true,
      });
    } else {
      dispatch(addToCart({ ...product, quantity }));
      setAlreadyAdded({
        message: "Added to cart successfully!",
        className: "border-emerald-500 text-emerald-600",
        show: true,
      });
    }
  };

  // console.log(products);

  return (
    <div className="flex flex-col h-full gap-10">
      {alreadyAdded.show && (
        <Alert
          message={alreadyAdded.message}
          className={alreadyAdded.className}
        />
      )}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-indigo-600 font-bold text-xs">{brand}</span>
          <span className="text-slate-300">•</span>
          {rating && <StarRating initialRating={rating} readOnly={true} />}
          <span className="font-semibold text-slate-800">{rating}</span>
          <span className="text-slate-500">({reviews?.length})</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
          {title}
        </h1>
        <p className="text-slate-600 text-sm">{description}</p>

        <div className="flex items-center gap-3">
          <span className="text-3xl font-extrabold text-slate-900">
            ${price}
          </span>
          <span className="text-xl font-medium text-slate-400 line-through">
            ${original(price, discountPercentage)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-rose-600">
          {availabilityStatus}
        </div>
      </div>

      <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100/60 flex flex-col gap-4">
        <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
          <span className="text-xl">Quantity</span>
          <div className="flex items-center gap-3 bg-white px-4 rounded-2xl border border-slate-200">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              className="text-slate-500 text-2xl hover:text-slate-800 font-bold flex items-center"
            >
              -
            </button>
            <span className="font-semibold text-slate-800 text-center text-lg">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              className="text-slate-500 text-xl hover:text-slate-800 font-bold flex items-center"
            >
              +
            </button>
          </div>
        </div>

        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
          onClick={handleAddToCart}
        >
          <IoCartOutline className="text-xl" /> Add to Cart
        </button>

        <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-3 rounded-xl border border-slate-200 transition-colors">
          Buy Now
        </button>
      </div>

      <div className="grid grid-cols-2 gap-y-3 gap-x-4 p-2">
        <div className="flex items-center gap-2.5">
          <FiTruck className="text-indigo-600 text-lg" />
          <span className="text-xs text-slate-600 font-medium">
            {shippingInformation}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <IoShieldCheckmarkOutline className="text-indigo-600 text-lg" />
          <span className="text-xs text-slate-600 font-medium">
            {warrantyInformation}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <MdOutlineAssignmentReturn className="text-indigo-600 text-lg" />
          <span className="text-xs text-slate-600 font-medium">
            {returnPolicy}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <MdOutlineSupportAgent className="text-indigo-600 text-lg" />
          <span className="text-xs text-slate-600 font-medium">
            24/7 Priority Support
          </span>
        </div>
      </div>
    </div>
  );
};

const Reviews = ({ reviews }) => {
  return (
    <div className="flex flex-col gap-5 mt-6">
      <ul className="flex flex-col gap-3">
        {reviews &&
          reviews.map((review, index) => {
            const { rating, comment, date, reviewerEmail, reviewerName } =
              review;
            return (
              <li
                className="flex flex-col  md:gap-1 shadow-lg rounded-2xl p-1 md:p-2"
                key={index}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 md:gap-2">
                    <div className="bg-primary text-white flex items-center size-6 md:size-10 font-semibold md:font-bold justify-center rounded-full ">
                      {reviewerName.slice(0, 1)}
                    </div>
                    <div>
                      <p className="text-xs text-black font-semibold">{reviewerName}</p>
                      <p className="text-xs text-slate-500">{reviewerEmail}</p>
                    </div>
                  </div>
                  <div>
                    <StarRating initialRating={rating} size={16} />
                  </div>
                </div>
                <div className="p-3 text-[12px] md:text-[14px]">{comment}</div>
                <div className="p-3 text-[8px] md:text-[10px]">{date.split("T")[0]}</div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

const Specification = ({ brand, category, description, meta, weight }) => {
  return (
    <div className="flex items-center justify-between flex-col md:flex-row  mt-6">
      <div className="max-w-xl w-full justify-between flex flex-col gap-2">
        <h1 className="text-xs text-sm">
          <span className="text-xs text-sm font-semibold">Brand: </span>
          {brand}
        </h1>
        <p className="text-xs text-sm">
          <span className="text-xs text-sm font-semibold">Category: </span>
          {category}
        </p>
        <p className="text-xs text-sm">
          <span className="text-xs text-sm font-semibold">Description: </span>
          {description}
        </p>
        <p className="text-xs text-sm">
          <span className="text-xs text-sm font-semibold">Weight: </span>
          {weight}
        </p>
      </div>
      <div className="aspect-1/1">
        <img src={meta?.qrCode} alt="" className="w-25" />
      </div>
    </div>
  );
};

export default ProductDetail;
