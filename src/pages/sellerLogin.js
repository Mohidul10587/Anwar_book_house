import { useContext, useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";
import {
  FiMail,
  FiLock,
  FiUserPlus,
  FiAlertCircle,
  FiHelpCircle,
  FiLoader,
  FiPhone,
} from "react-icons/fi";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import RootLayout from "@/components/layouts/RootLayout";
import url from "../../url";

// import { Header } from "@/components/layouts/Header";

const Login = () => {
  // const value = useContext(ThemeContext);
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://test.notebookprokash.com/seller/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber, password }),
        }
      );
      const data = await response.json();
      console.log(data);
      localStorage.setItem("accessToken", data.accessToken);
      if (!response.ok) {
        setError(data.message);
        setIsLoading(false);
        return;
      }

      router.push("/sellerDashboard");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      alert("Please Enter Correct Email and Password");
    }
  };

  return (
    <div className="min-h-screen pb-24">
      {/* <Header /> */}
      <div className="flex justify-center  px-2 md:pt-28 pt-20">
        <div className="w-full">
          <h1 className="text-center text-2xl text-gray-600 mb-4">
            Welcome to Anwar Book Shop! Please login.{" "}
            <span className="text-xs">Seller</span>
          </h1>

          <div className="md:flex justify-center gap-6">
            <form className="  md:w-1/3 " onSubmit={handleLogin}>
              {error && (
                <div className="flex items-center space-x-2">
                  <FiAlertCircle size={20} />
                  <div className="text-red-500">{error}</div>
                </div>
              )}
              <div className="relative">
                <FiPhone className="absolute top-3 left-3 text-gray-400" />
                <input
                  className="p-2 border border-primary focus:outline-none rounded w-full pl-10"
                  type="tel" // Change type to "tel" for phone number
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div className="relative mt-4">
                <FiLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  className=" p-2 border  border-primary focus:outline-none rounded w-full pl-10"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <br />
              <button className=" p-2 border border-primary focus:outline-none  bg-secondary text-white rounded  w-full flex items-center justify-center">
                {isLoading ? (
                  <div className="flex gap-1 items-center">
                    {" "}
                    <FiLoader className="animate-spin mr-2" />{" "}
                    <span>Loading...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
              <div className="mt-4 md:text-base text-xs">
                <div className="flex justify-between">
                  <Link href="forgotPassword">
                    <div className="text-red-800 hover:text-red-600 flex gap-1 items-center">
                      <FiHelpCircle className="" />
                      <p> Forget password?</p>
                    </div>
                  </Link>
                  <Link href="sellerSignUp">
                    <div className="text-green-800 hover:text-green-600 flex gap-1 items-center">
                      <FiUserPlus className="" />
                      <p>Create account</p>
                    </div>
                  </Link>
                </div>
              </div>
            </form>

            <div className="md:w-1/3">
              <p className="text-center text-2xl p-2">------- OR --------</p>
              <button
                onClick={() =>
                  alert(
                    "This feature is no implemented yet. Please log in with email and password"
                  )
                }
                className="mt-3 p-[8px] border border-[#3b5998] focus:outline-none bg-[#3b5998] text-white rounded w-full flex items-center justify-center"
              >
                <FaFacebook className="mr-2" />
                <span> Facebook</span>
              </button>
              <button
                onClick={() =>
                  alert(
                    "This feature is no implemented yet. Please log in with email and password"
                  )
                }
                className="p-2 border border-[#a03224] focus:outline-none bg-[#d34836] text-white rounded mt-6 w-full flex items-center justify-center"
              >
                <FaGoogle className="mr-2 -ml-4" />
                <span>Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
Login.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default Login;
