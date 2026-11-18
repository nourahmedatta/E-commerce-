
import { useContext } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const user = {
    email: "",
    password: "",

  };

async function signin(values) {
  try {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === values.email && u.password === values.password
    );

    if (!user) {
      alert("Invalid email or password");
      return;
    }

    login(user);
    navigate("/");
  } catch (e) {
    console.log(e.message);
  }
}

  const formik = useFormik({
    initialValues: user,
    onSubmit: signin,
  });

  return (
    <div className='py-7'>
      <div className="container mx-auto">
        <h1 className='text-green-700 text-6xl font-bold text-center mb-12'>
          Login Now
        </h1>

        <div className='w-[60%] mx-auto'>
          <form onSubmit={formik.handleSubmit}>



            {/* EMAIL */}
            <div className="relative z-0 w-full mb-7 group">
              <input
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                placeholder=" "
                required
              />
              <label htmlFor="email"
                className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                Email
              </label>
            </div>

            {/* PASSWORD */}
            <div className="relative z-0 w-full mb-7 group">
              <input
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                name="password"
                id="password"
                className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                placeholder=" "
                required
              />
              <label htmlFor="password"
                className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                Password
              </label>
            </div>



            {/* BUTTON */}
            <button
              type="submit"
              className="text-white bg-green-600 px-4 py-2 rounded"
            >
              Login
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;