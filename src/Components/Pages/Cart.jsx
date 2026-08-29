import { useDispatch, useSelector } from "react-redux";
import { CiLock } from "react-icons/ci";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../Store/Cart/cartSlice";

const Cart = () => {
  const { products = [] } = useSelector((state) => state.cart);
  console.log(products)
  const dispatch = useDispatch();

  const subTotal = products.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  },0)

  return (
    <section className="w-full min-h-screen bg-[#F2F3FF]">
      <div className="max-w-7xl w-full mx-auto flex flex-col p-4 md:p-10 gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-medium">Your Cart</h1>
          <p className="text-slate-600 mt-1">
            {products.length} items in your
            cart. Free shipping applies.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <p className="text-slate-500 text-lg">
              Your cart is currently empty.
            </p>
          </div>
        ) : (
          <div className="flex w-full justify-between gap-6 flex-col lg:flex-row items-start">
            <ul className="flex flex-col gap-4 w-full lg:w-2/3">
              {products.map((product) => {
                const {
                  id,
                  thumbnail,
                  title,
                  brand,
                  price,
                  quantity,
                } = product;
                return (
                  <li
                    key={id}
                    className="flex gap-4 rounded-2xl p-4 bg-white shadow-sm"
                  >
                    <div className="bg-slate-100 w-28 h-28 md:w-36 md:h-36 rounded-xl flex-shrink-0 overflow-hidden">
                      <img
                        src={thumbnail}
                        alt={title}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    <div className="w-full flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h2 className="text-sm md:text-lg font-semibold line-clamp-1">
                            {title}
                          </h2>
                          {brand && (
                            <p className="text-xs md:text-sm text-slate-500">
                              {brand}
                            </p>
                          )}
                        </div>
                        <div className="font-bold text-base md:text-lg">
                          ${(price * quantity).toFixed(2)}
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-3 bg-slate-50 px-3 py-1 rounded-xl border border-slate-200">
                          <button
                            className="text-slate-500 hover:text-slate-800 font-bold text-lg px-1 transition-colors"
                            onClick={() => dispatch(decreaseQuantity(product))}
                          >
                            -
                          </button>
                          <span className="font-semibold text-slate-800 text-center min-w-[20px]">
                            {quantity}
                          </span>
                          <button
                            className="text-slate-500 hover:text-slate-800 font-bold text-lg px-1 transition-colors"
                            onClick={() => dispatch(increaseQuantity(product))}
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="text-red-500 hover:text-red-700 font-semibold text-sm transition-colors"
                          onClick={() => removeFromCart(product)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="bg-white flex flex-col w-full lg:w-1/3 rounded-2xl p-6 shadow-sm border border-slate-100 gap-6">
              <div className="flex flex-col gap-4">
                <h2 className="font-semibold text-xl">Order Summary</h2>
                <div className="flex flex-col gap-2 border-b border-slate-200 pb-4 text-sm md:text-base">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-semibold">
                      ${subTotal}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span className="text-slate-600">Estimated Tax</span>
                    <span className="font-medium">$Tax</span>
                  </div> */}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-2xl text-[#3525cd] font-bold">
                    ${subTotal}
                  </span>
                </div>
                <button className="bg-[#3525cd] hover:bg-[#281ba8] text-white font-semibold py-3.5 rounded-xl transition-colors w-full">
                  Proceed To Checkout
                </button>
                <div className="flex justify-center items-center gap-1.5 text-slate-500 text-xs">
                  <CiLock className="text-base" />
                  <span>Secure encrypted checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
