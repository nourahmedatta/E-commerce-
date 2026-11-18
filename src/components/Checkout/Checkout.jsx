import { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useContext(ProductContext);
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", city: "", payment: "cash"
  });

  const total = cart.reduce((acc, item) => acc + parseFloat(item.price) * item.qty, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.phone || !form.address || !form.city) {
      alert("Please fill in all fields");
      return;
    }
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-6 px-4">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <i className="fa-solid fa-check text-green-600 text-4xl"></i>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Order Placed!</h1>
        <p className="text-gray-500 text-center">
          Thank you <span className="text-green-600 font-semibold">{form.name}</span>!<br />
          Your order will be delivered to <span className="font-semibold">{form.city}</span> soon.
        </p>
        <button
          onClick={() => navigate("/home")}
          className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-gray-400 text-xl">Your cart is empty</p>
        <button
          onClick={() => navigate("/shop")}
          className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition"
        >
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-8">

        {/* Form */}
        <div className="md:col-span-2 space-y-6">

          {/* Personal Info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-user text-green-500"></i>
              Personal Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ahmed Mohamed"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="ahmed@email.com"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="01xxxxxxxxx"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">City</label>
                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                >
                  <option value="">Select city</option>
                  <option>Cairo</option>
                  <option>Alexandria</option>
                  <option>Giza</option>
                  <option>Mansoura</option>
                  <option>Tanta</option>
                  <option>Aswan</option>
                  <option>Luxor</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm text-gray-500 mb-1 block">Address</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Street, Building, Floor..."
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-credit-card text-green-500"></i>
              Payment Method
            </h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { value: "cash", label: "Cash on Delivery", icon: "fa-money-bill-wave" },
                { value: "card", label: "Credit Card", icon: "fa-credit-card" },
                { value: "vodafone", label: "Vodafone Cash", icon: "fa-mobile-screen" },
              ].map((method) => (
                <label
                  key={method.value}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition
                    ${form.payment === method.value
                      ? "border-green-500 bg-green-50"
                      : "border-gray-100 hover:border-gray-200"
                    }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.value}
                    checked={form.payment === method.value}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <i className={`fa-solid ${method.icon} text-2xl ${form.payment === method.value ? "text-green-500" : "text-gray-400"}`}></i>
                  <span className={`text-sm font-medium text-center ${form.payment === method.value ? "text-green-600" : "text-gray-500"}`}>
                    {method.label}
                  </span>
                </label>
              ))}
            </div>

            {form.payment === "card" && (
              <div className="mt-4 space-y-3">
                <input
                  type="text"
                  placeholder="Card Number (1234 5678 9012 3456)"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
              </div>
            )}

            {form.payment === "vodafone" && (
              <div className="mt-4">
                <input
                  type="tel"
                  placeholder="Vodafone Cash Number"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.image_url || item.image}
                    alt={item.name}
                    className="w-12 h-12 object-contain rounded-lg bg-gray-50 p-1 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                    <p className="text-xs text-gray-400">x{item.qty}</p>
                  </div>
                  <p className="text-sm font-bold text-gray-800 whitespace-nowrap">
                    {(parseFloat(item.price) * item.qty).toFixed(2)} EGP
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Items ({totalItems})</span>
                <span>{total.toFixed(2)} EGP</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Delivery</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between font-bold text-gray-800 text-lg border-t pt-2 mt-2">
                <span>Total</span>
                <span className="text-green-600">{total.toFixed(2)} EGP</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full mt-6 bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition active:scale-95 shadow-md"
            >
              Place Order
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="w-full mt-3 text-green-600 font-medium hover:underline text-center text-sm"
            >
              ← Back to Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}