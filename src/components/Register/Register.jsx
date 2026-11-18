
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const Register = () => {
const navigate= useNavigate() 

  const user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: ""
  };

async function signup(values) {
  try {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // check if email already exists
    const exists = users.find((u) => u.email === values.email);
    if (exists) {
      alert("Email already exists");
      return;
    }

    // check password match
    if (values.password !== values.rePassword) {
      alert("Passwords do not match");
      return;
    }

    // remove rePassword before saving
    const newUser = {
      name: values.name,
      email: values.email,
      password: values.password,
      phone: values.phone,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered successfully");

    navigate("/login");
  } catch (e) {
    console.log(e.message);
  }
}
  const formik = useFormik({
    initialValues: user,
    onSubmit: signup,
  });

  return (
    <div className='py-7'>
      <div className="container mx-auto">
        <h1 className='text-green-700 text-6xl font-bold text-center mb-12'>
          Register Now
        </h1>

        <div className='w-[60%] mx-auto'>
          <form onSubmit={formik.handleSubmit}>

            {/* NAME */}
            <div className="relative z-0 w-full mb-7 group">
              <input
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                name="name"
                id="name"
                className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                placeholder=" "
                required
              />
              <label htmlFor="name"
                className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                Name
              </label>
            </div>

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

            {/* PHONE */}
            <div className="relative z-0 w-full mb-7 group">
              <input
                type="tel"
                onChange={formik.handleChange}
                value={formik.values.phone}
                name="phone"
                id="phone"
                className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                placeholder=" "
                required
              />
              <label htmlFor="phone"
                className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                Phone
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

            {/* RE PASSWORD */}
            <div className="relative z-0 w-full mb-7 group">
              <input
                type="password"
                onChange={formik.handleChange}
                value={formik.values.rePassword}
                name="rePassword"
                id="rePassword"
                className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                placeholder=" "
                required
              />
              <label htmlFor="rePassword"
                className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                Re-Password
              </label>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="text-white bg-green-600 px-4 py-2 rounded"
            >
              Register
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

