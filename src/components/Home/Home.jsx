import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import ProductCard from "../ProductCard/ProductCard";
import ErrorState from "../ErrorState/ErrorState";
import { ProductContext } from "../../context/ProductContext";

export default function Home() {
  const { filtered, loading, error, retry } = useContext(ProductContext);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
          <h1 className="text-3xl font-bold text-green-500 animate-pulse">
            Loading Freshness...
          </h1>
        </div>
      </div>
    );
  }

  if (error) return <ErrorState message={error} onRetry={retry} />;

  return (
    <div className="container mx-auto px-4 py-10">

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Fresh Products</h1>
        <p className="text-gray-500 text-lg">Discover our best vegetables and fruits</p>
      </div>

      <SearchBar />

      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {filtered.slice(0, 12).map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-10 text-lg">No products found.</p>
      )}

      <div className="text-center mt-12">
        <button
          onClick={() => navigate("/shop")}
          className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-all shadow-lg"
        >
          View All Products
        </button>
      </div>

    </div>
  );
}

