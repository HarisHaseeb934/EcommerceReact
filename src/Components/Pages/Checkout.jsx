import { useSelector } from "react-redux";
import PaymentDetails from "./Ui/PaymentDetails";
import ShippingInformation from "./Ui/ShippingInformation";

const Checkout = () => {
  const { products } = useSelector((state) => state.cart);
  const total = products.reduce((acc, pro) => {
    acc += pro.price * pro.quantity;
    return acc;
  }, 0);
  return (
    <section className="w-full bg-[#faf8ff] ">
      <div className="max-w-7xl  grid grid-cols-1 md:grid-cols-3">
        <div className=" mx-auto col-span-2">
          <ShippingInformation />
          <PaymentDetails />
        </div>
        <div className="max-w-xl w-full mx-auto bg-white p-4 my-10 flex flex-col gap-5">
          <h1 className="text-black text-base md:text-lg font-semibold">
            Order Summary
          </h1>
          <ul className="flex flex-col gap-3 my-4 justify-center w-full">
            {products.map((pro, index) => {
              const { thumbnail, title, brand, quantity, price } = pro;
              return (
                <li
                  key={index}
                  className="flex items-center shadow-2xs text-stone-600 text-xs md:text-base rounded-xl w-full"
                >
                  <div className="aspect-square w-20 overflow-hidden rounded-2xl">
                    <img
                      src={thumbnail}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-2 w-full">
                    <div>
                      <h2 className="text-[14px] md:text-sm text-black line-clamp-1">
                        {title}
                      </h2>
                      <p className="text-[12px] md:text-sm">{brand}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-[12px] md:text-sm">Qty: {quantity}</p>
                      <p className="text-[12px] md:text-sm text-black">
                        ${price}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <span>Total</span>
              <span>${total}</span>
            </div>
            <button className="bg-primary py-2 md:py-3 text-white ">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
