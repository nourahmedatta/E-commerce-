import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading, addToCart } = useContext(ProductContext);
  const [added, setAdded] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const product = products.find((item) => String(item.id) === String(id));

  if (!product) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <p className="text-2xl font-bold text-red-500">Product Not Found</p>
        <button
          onClick={() => navigate("/shop")}
          className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 transition"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-gray-500 hover:text-green-600 font-medium flex items-center gap-2 transition"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-10 bg-white shadow-lg rounded-2xl p-6">

        <div className="overflow-hidden rounded-xl bg-gray-50">
          <img
            src={product.image_url || product.image}
            alt={product.name}
            className="w-full h-[400px] object-contain p-4 hover:scale-105 duration-300"
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full font-bold uppercase w-fit mb-4">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-2xl text-green-600 font-semibold mb-4">{product.price} EGP</p>
          <p className="text-gray-500 leading-7 mb-6">
            This product is one of our premium items with high quality and great design. Perfect for daily use.
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleAdd}
              className={`px-6 py-3 rounded-xl text-lg font-bold transition duration-300 text-white
                ${added ? "bg-gray-800" : "bg-green-500 hover:bg-green-600"}`}
            >
              {added ? "✓ Added to Cart!" : "Add To Cart"}
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="px-6 py-3 rounded-xl text-lg font-bold border border-green-500 text-green-600 hover:bg-green-50 transition">
              View Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

