import { useEffect, useState } from "react";
import axios from "axios";
import { ProductContext } from "./ProductContext";

const API_URL =
  import.meta.env.VITE_API_URL || "https://api-xh9w.onrender.com/products";

const FLAT_CATEGORIES = [
  "vegetables",
  "fruits",
  "dairy",
  "meat",
  "snacks",
  "cheese",
  "desserts",
];

const CART_KEY = "cart";

const readStoredCart = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

/** Flattens the API response (nested by category) into a single products array. */
const normalize = (data) => {
  const all = [];

  FLAT_CATEGORIES.forEach((key) => {
    if (Array.isArray(data?.[key])) all.push(...data[key]);
  });

  if (data?.beverages) {
    Object.values(data.beverages).forEach((group) => {
      if (Array.isArray(group?.productsBeverages)) {
        all.push(...group.productsBeverages);
      }
    });
  }

  return all;
};

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [cart, setCart] = useState(readStoredCart);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get(API_URL, { signal: controller.signal })
      .then(({ data }) => {
        const allProducts = normalize(data);
        setProducts(allProducts);
        setFiltered(allProducts);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        console.error(err);
        setError("We couldn't load the products. Please try again.");
        setLoading(false);
      });

    return () => controller.abort();
  }, [reloadKey]);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const retry = () => {
    setLoading(true);
    setError(null);
    setReloadKey((k) => k + 1);
  };

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  const updateQty = (productId, newQty) => {
    if (newQty < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, qty: newQty } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const filterProducts = (
    category = activeCategory,
    search = searchTerm,
    price = maxPrice
  ) => {
    let result = [...products];

    if (category !== "all") {
      result = result.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (search.trim() !== "") {
      result = result.filter((p) =>
        p.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    result = result.filter((p) => {
      const numPrice = parseFloat(p.price);
      return Number.isNaN(numPrice) ? true : numPrice <= price;
    });

    setFiltered(result);
    setActiveCategory(category);
    setSearchTerm(search);
    setMaxPrice(price);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        filtered,
        loading,
        error,
        retry,
        activeCategory,
        searchTerm,
        setSearchTerm,
        maxPrice,
        filterProducts,
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
