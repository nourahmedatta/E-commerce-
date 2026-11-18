import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Error from "./components/Error/Error";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Layout from "./components/Layout/Layout";
import Shop from "./components/Shop/Shop";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import ProductProvider from "./context/ProductProvider";
import AuthProvider from "./context/AuthProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/home" replace /> },
      { path: "home", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "shop", element: <Shop /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "*", element: <Error /> },
    ],
  },
]);

const App = () => (
  <AuthProvider>
    <ProductProvider>
      <RouterProvider router={router} />
    </ProductProvider>
  </AuthProvider>
);

export default App;
