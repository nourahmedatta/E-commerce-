import React, { useContext, useState } from 'react';
import { ProductContext } from '../../context/ProductContext';
import ErrorState from '../ErrorState/ErrorState';

export default function Shop() {
  const [addedItems, setAddedItems] = useState({});
  const [quantities, setQuantities] = useState({});

  // Hooks must run before any early return
  const {
    filtered,
    filterProducts,
    activeCategory,
    maxPrice,
    searchTerm,
    addToCart,
    loading,
    error,
    retry
  } = useContext(ProductContext);

  const categories = ["all", "vegetables", "fruits", "beverages", "dairy", "meat", "snacks", "cheese"];

  const getQty = (id) => quantities[id] || 1;

  const increaseQty = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  const decreaseQty = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) - 1) }));
  };

  const handleAddToCart = (product) => {
    const qty = getQty(product.id);
    addToCart(product, qty);

    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 1000);

    setQuantities((prev) => ({ ...prev, [product.id]: 1 }));
  };

  // Loading state (after hooks)
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        <span className="ml-3 text-gray-600 font-medium">Loading Products...</span>
      </div>
    );
  }

  if (error) return <ErrorState message={error} onRetry={retry} />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 bg-gray-50 min-h-screen">

      {/* Sidebar */}
      <aside className="w-full md:w-64 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
          <h2 className="text-lg font-bold mb-4 text-gray-800 border-b pb-2">Categories</h2>
          <ul className="space-y-3">
            {categories.map((cat) => (
              <li key={cat} className="flex items-center">
                <input
                  type="radio"
                  id={cat}
                  name="category"
                  className="w-4 h-4 text-green-600 focus:ring-green-500 cursor-pointer"
                  checked={activeCategory === cat}
                  onChange={() => filterProducts(cat, searchTerm, maxPrice)}
                />
                <label
                  htmlFor={cat}
                  className={`ml-3 capitalize cursor-pointer transition-colors ${
                    activeCategory === cat ? 'text-green-600 font-bold' : 'text-gray-600 hover:text-green-500'
                  }`}
                >
                  {cat}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Products Grid */}
      <main className="flex-1">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="group bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden rounded-xl bg-gray-50 mb-4">
                  <img
                    src={product.image_url || product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col flex-grow">
                  <span className="text-[10px] bg-green-50 text-green-600 px-2 py-1 rounded-full font-bold uppercase w-fit">
                    {product.category}
                  </span>
                  <h3 className="text-gray-800 font-semibold text-base mt-2 h-12 line-clamp-2 leading-tight">
                    {product.name}
                  </h3>

                  <div className="mt-4 pt-4 border-t border-gray-50">
                    <p className="text-xl font-black text-gray-900 mb-3">{product.price} EGP</p>

                    {/* Quantity */}
                    <div className="flex items-center gap-3 mb-3">
                      <button
                        onClick={() => decreaseQty(product.id)}
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold text-lg transition"
                      >
                        −
                      </button>
                      <span className="text-gray-800 font-semibold w-6 text-center">
                        {getQty(product.id)}
                      </span>
                      <button
                        onClick={() => increaseQty(product.id)}
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 font-bold text-lg transition"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Cart */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-bold transition-all active:scale-95 shadow-sm
                        ${addedItems[product.id]
                          ? 'bg-gray-800 text-white'
                          : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                    >
                      {addedItems[product.id] ? (
                        <><i className="fa-solid fa-check"></i> Added!</>
                      ) : (
                        <><i className="fa-solid fa-cart-plus"></i> Add {getQty(product.id) > 1 ? `(${getQty(product.id)})` : ''}</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400 text-lg text-center px-4">No products found matching your filters.</p>
            <button
              onClick={() => filterProducts('all', '', 1000)}
              className="mt-4 text-green-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
