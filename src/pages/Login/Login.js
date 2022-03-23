import { FaSignInAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import useLogin from "../../hooks/useLogin";
import useToast from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { createToast } = useToast(1500);
  const { login, loading, success, error } = useLogin();
  const navigate = useNavigate();

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    login(email, password);

    resetForm();
  };

  useEffect(() => {
    if (success) {
      createToast("logged in successfully!", "success");
      navigate("/");
    }

    if (error) {
      createToast(error, "error");
    }
  }, [success, error, navigate]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex container mt-8  mx-auto justify-center items-center dark:text-white p-7">
      <form
        className="p-3 sm:p-5 xl:p-6 w-11/12 sm:w-3/4 lg:w-3/5"
        onSubmit={handleOnSubmit}
      >
        <div className="my-3 flex justify-center">
          <h1 className=" text-4xl text-center flex gap-1 ">
            <FaSignInAlt />
            Login
          </h1>
        </div>

        <div className="p-3 mb-2 flex flex-col">
          <h1 className="text-2xl dark:text-white text-black">Email :</h1>
          <input
            className="p-2  dark:text-black border-[2.3px] border-gray-600 rounded-md outline-none dark:focus:outline-blue-400 focus:border-indigo-600 "
            type="email"
            placeholder="your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="p-3 mb-2 flex flex-col">
          <h1 className="text-2xl dark:text-white text-black">Passsword :</h1>
          <input
            className="p-2  dark:text-black border-[2.3px] border-gray-600 rounded-md outline-none dark:focus:outline-blue-400 focus:border-indigo-600 "
            type="password"
            placeholder="your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mt-2 flex justify-center items-center p-1">
          <button
            className="p-4 transition-all w-full sm:w-5/12 xl:w-3/12 text-xl font-bold dark:text-white border-[2.3px] bg-indigo-600 rounded-xl hover:bg-indigo-500 hover:translate-y-[-2] dark:bg-blue-400 dark:border-gray-700 dark:hover:bg-blue-500"
            type="submit"
          >
            {loading ? "Loading" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
