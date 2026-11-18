import { useContext } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import logo from './../../assets/images/logo.svg';
import { ProductContext } from '../../context/ProductContext';
import { AuthContext } from '../../context/AuthContext';

function Navbar() {
  const context = useContext(ProductContext);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  const cart = context?.cart || [];
  
  const totalItems = cart.reduce((acc, item) => acc + (item.qty || 0), 0);

  return (
    <nav className="p-4 bg-gray-100 sticky top-0 z-50 shadow-sm font-sans">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4">

          {/* Left Side */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img src={logo} alt="logo" className="w-[170px]" />
            <ul className="flex items-center gap-6">
              <li><NavLink to="/home" className={({isActive}) => isActive ? "text-green-600 font-bold" : "text-gray-600"}>Home</NavLink></li>
              <li><NavLink to="/shop" className={({isActive}) => isActive ? "text-green-600 font-bold" : "text-gray-600"}>Shop</NavLink></li>
            </ul>
          </div>

          {/* Right Side */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Social */}
            <div className="flex gap-4 text-xl">
              <i className="fa-brands fa-facebook text-blue-600 cursor-pointer"></i>
              <i className="fa-brands fa-instagram text-pink-500 cursor-pointer"></i>
              <i className="fa-brands fa-x-twitter cursor-pointer"></i>
            </div>

            <div className="flex items-center gap-6">
              {/* Cart Icon with Badge */}
              <NavLink to="/cart" className="relative group p-2">
                <i className="fa-solid fa-cart-shopping text-2xl text-gray-700 group-hover:text-green-600 transition-colors"></i>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                    {totalItems}
                  </span>
                )}
              </NavLink>

              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-medium">
                    Hi, {user.name?.split(" ")[0] || "there"}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-red-500 transition"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <ul className="flex items-center gap-4">
                  <li><NavLink to="/login" className="text-gray-600 hover:text-green-600">Login</NavLink></li>
                  <li><NavLink to="/register" className="text-gray-600 hover:text-green-600">Register</NavLink></li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

