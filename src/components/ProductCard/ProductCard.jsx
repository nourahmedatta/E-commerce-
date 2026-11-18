import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-2xl p-3 shadow hover:shadow-lg transition-all duration-300 bg-white">
      <img
        src={product.image_url || product.image}
        alt={product.name}
        className="w-full h-40 object-contain rounded-xl bg-gray-50 p-2"
      />
      <h2 className="font-bold mt-2 text-gray-800 line-clamp-2">{product.name}</h2>
      <p className="text-green-600 font-semibold">{product.price} EGP</p>
      <Link
        to={`/product/${product.id}`}
        className="bg-green-500 text-white px-3 py-2 rounded-xl block mt-2 text-center hover:bg-green-600 transition"
      >
        View Details
      </Link>
    </div>
  );
}