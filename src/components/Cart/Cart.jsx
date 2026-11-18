import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Cart() {
    const navigate = useNavigate();

  const { cart, updateQty, removeFromCart, clearCart } = useContext(ProductContext);

  const total = cart.reduce((acc, item) => acc + parseFloat(item.price) * item.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <i className="fa-solid fa-cart-shopping text-6xl text-gray-200"></i>
        <p className="text-gray-400 text-xl">Your cart is empty</p>
        <Link
          to="/shop"
          className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          My Cart
          <span className="ml-2 text-lg text-gray-400 font-normal">
            ({cart.length} item{cart.length > 1 ? 's' : ''})
          </span>
        </h1>
        <button
          onClick={clearCart}
          className="text-red-500 hover:text-red-700 font-medium text-sm transition"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-4 mb-8">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4"
          >
            <img
              src={item.image_url || item.image}
              alt={item.name}
              className="w-20 h-20 object-contain rounded-xl bg-gray-50 p-1 flex-shrink-0"
            />

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 truncate">{item.name}</p>
              <p className="text-green-600 font-bold">{item.price} EGP</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => item.qty === 1 ? removeFromCart(item.id) : updateQty(item.id, item.qty - 1)}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 text-gray-600 font-bold text-lg transition"
              >
                −
              </button>
              <span className="w-8 text-center font-bold text-gray-800">{item.qty}</span>
              <button
                onClick={() => updateQty(item.id, item.qty + 1)}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 text-gray-600 font-bold text-lg transition"
              >
                +
              </button>
            </div>

            <div className="text-right min-w-[80px]">
              <p className="font-black text-gray-900">
                {(parseFloat(item.price) * item.qty).toFixed(2)} EGP
              </p>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-gray-300 hover:text-red-500 transition ml-2"
            >
              <i className="fa-solid fa-trash text-sm"></i>
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex justify-between items-center mb-2 text-gray-500">
          <span>Subtotal ({cart.reduce((a, i) => a + i.qty, 0)} items)</span>
          <span>{total.toFixed(2)} EGP</span>
        </div>
        <div className="flex justify-between items-center mb-6 border-t pt-4">
          <span className="font-bold text-gray-800 text-lg">Total</span>
                  <span className="font-black text-green-600 text-2xl">{total.toFixed(2)} EGP</span>
              </div>
              <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition active:scale-95 shadow-md"
              >
                  Checkout
              </button>
        <Link
          to="/shop"
          className="block text-center text-green-600 font-medium mt-4 hover:underline"
        >
          Continue Shopping
        </Link>
      </div>

    </div>
  );
}

