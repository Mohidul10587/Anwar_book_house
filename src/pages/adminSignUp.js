import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  FiUser,
  FiMail,
  FiLock,
  FiLoader,
  FiAlertCircle,
} from "react-icons/fi";
import RootLayout from "@/components/layouts/RootLayout";
import url from "../../url";

const Signup = () => {
  const router = useRouter();

  const [sellerData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    income: "",
    phoneNumber: "",
    nameOfThePublication: "",
    image: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    if (event.target.name === "image") {
      setUserData({ ...sellerData, image: event.target.files[0] });
    } else {
      setUserData({ ...sellerData, [event.target.name]: event.target.value });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", sellerData.name);
      formData.append("email", sellerData.email);
      formData.append("password", sellerData.password);

      formData.append("image", sellerData.image);

      const response = await fetch(
        `https://test.notebookprokash.com/admin/create`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      console.log(data);
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/adminDashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-center min-h-screen items-center px-2">
        <form
          onSubmit={handleFormSubmit}
          className="border bg-secondary rounded border-gray-400 md:w-1/2 p-10"
        >
          <h1 className="text-center  text-2xl text-white mb-4">
            Welcome to Anwar Book Shop! Please Sign Up .{" "}
            <span className="text-xs">Admin</span>
          </h1>

          {error && (
            <div className="flex items-center space-x-2 mb-4">
              <FiAlertCircle className="text-red-500" size={20} />
              <p className="text-red-500">{error}</p>
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <div className="relative">
              <FiUser className="absolute top-3 left-3 text-gray-400" />
              <input
                id="name"
                name="name"
                value={sellerData.name}
                onChange={handleInputChange}
                className="border border-gray-400 p-2 rounded w-full pl-10"
                type="text"
                placeholder="Name"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <FiMail className="absolute top-3 left-3 text-gray-400" />
              <input
                id="email"
                name="email"
                value={sellerData.email}
                onChange={handleInputChange}
                className="border border-gray-400 p-2 rounded w-full pl-10"
                type="email"
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute top-3 left-3 text-gray-400" />
              <input
                id="password"
                name="password"
                value={sellerData.password}
                onChange={handleInputChange}
                className="border border-gray-400 p-2 rounded w-full pl-10"
                type="password"
                placeholder="Password"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="sr-only">
              Image
            </label>
            <div className="relative">
              <input
                id="image"
                name="image"
                onChange={handleInputChange}
                className="border border-gray-400 p-2 rounded w-full"
                type="file"
                accept="image/*"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-white text-black py-2 px-4 rounded-lg w-full transition duration-300 ease-in-out hover:bg-primary hover:text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <FiLoader className="animate-spin mr-2" />
                <span>Loading...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
Signup.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default Signup;
