import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";

export default function SearchBar() {
  const { searchTerm, filterProducts, activeCategory, maxPrice } = useContext(ProductContext);

  return (
    <div className="p-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => filterProducts(activeCategory, e.target.value, maxPrice)}
        placeholder="Search products..."
        className="w-full p-3 border border-gray-200 rounded-lg shadow-sm 
                   text-gray-800 bg-white placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>
  );
}

