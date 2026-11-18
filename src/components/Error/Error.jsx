import { Link } from "react-router-dom";
import errorImg from "../../assets/images/error.svg";

function Error() {
  return (
    <div className="w-full max-w-xl mx-auto py-7 px-4 text-center">
      <img src={errorImg} alt="Page not found" className="w-full" />
      <Link
        to="/home"
        className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default Error;
