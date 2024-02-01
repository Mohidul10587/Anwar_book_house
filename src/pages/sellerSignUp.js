import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  FiUser,
  FiMail,
  FiLock,
  FiLoader,
  FiAlertCircle,
  FiPhone,
  FiMapPin,
  FiAtSign,
  FiFile,
  FiImage,
} from "react-icons/fi";
import RootLayout from "@/components/layouts/RootLayout";
import url from "../../url";
import { publications } from "@/utility/publications";
import CustomFileInput from "@/components/CustomFileInput;";

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
    designation: "",
    officeAddress: "",
    publicationsEmail: "",
    publicationsPhoneNumber: "",
    publicationsLogo: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    if (
      event.target.name === "image" ||
      event.target.name === "publicationsLogo"
    ) {
      setUserData({
        ...sellerData,
        [event.target.name]: event.target.files[0],
      });
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
      formData.append("income", 0);
      formData.append("phoneNumber", sellerData.phoneNumber);
      formData.append("nameOfThePublication", sellerData.nameOfThePublication);

      formData.append("designation", sellerData.designation);
      formData.append("officeAddress", sellerData.officeAddress);
      formData.append("publicationsEmail", sellerData.publicationsEmail);
      formData.append(
        "publicationsPhoneNumber",
        sellerData.publicationsPhoneNumber
      );
      formData.append("image", sellerData.image);
      formData.append("publicationsLogo", sellerData.publicationsLogo);

      const response = await fetch(
        `https://test.notebookprokash.com/seller/create`,
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
      router.push("/sellerDashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full py-24">
      <div className="flex justify-center min-h-screen items-center px-2">
        <form
          onSubmit={handleFormSubmit}
          className="border bg-secondary rounded border-gray-400  p-10"
        >
          <h1 className="text-center text-3xl text-white mb-4">
            Welcome to Anwar Book Shop!
          </h1>
          <p className="text-xs text-white mb-8 block text-center">
            Please Sign Up as a Seller
          </p>
          {error && (
            <div className="flex items-center space-x-2 mb-4">
              <FiAlertCircle className="text-red-500" size={20} />
              <p className="text-red-500">{error}</p>
            </div>
          )}
          <div className="flex justify-center gap-12">
            {/* Seller Information */}
            <div>
              <h1 className="text-xl text-white text-center mb-4">
                Seller Information
              </h1>

              <CustomFileInput
                id="image"
                name="image"
                label="Image"
                onChange={handleInputChange}
                value={sellerData.image}
                accept="image/*"
              />
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="
            text-white"
                >
                  Name
                </label>{" "}
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
                <label
                  htmlFor="email"
                  className="
            text-white"
                >
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
                <label
                  htmlFor="password"
                  className="
            text-white"
                >
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
                <label
                  htmlFor="phoneNumber"
                  className="
            text-white"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <FiPhone className="absolute top-3 left-3 text-gray-400" />
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={sellerData.phoneNumber}
                    onChange={handleInputChange}
                    className="border border-gray-400 p-2 rounded w-full pl-10"
                    type="text"
                    placeholder="Phone Number"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="designation"
                  className="
            text-white"
                >
                  Designation
                </label>
                <div className="relative">
                  <FiMapPin className="absolute top-3 left-3 text-gray-400" />
                  <input
                    id="designation"
                    name="designation"
                    value={sellerData.designation}
                    onChange={handleInputChange}
                    className="border border-gray-400 p-2 rounded w-full pl-10"
                    type="text"
                    placeholder="Designation"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="officeAddress"
                  className="
            text-white"
                >
                  Office Address
                </label>
                <div className="relative">
                  <FiMapPin className="absolute top-3 left-3 text-gray-400" />
                  <input
                    id="officeAddress"
                    name="officeAddress"
                    value={sellerData.officeAddress}
                    onChange={handleInputChange}
                    className="border border-gray-400 p-2 rounded w-full pl-10"
                    type="text"
                    placeholder="Office Address"
                    required
                  />
                </div>
              </div>
            </div>
            {/* publications information */}
            <div>
              <h1 className="text-xl text-white text-center mb-4">
                Publications Information
              </h1>

              <CustomFileInput
                id="publicationsLogo"
                name="publicationsLogo"
                label="publicationsLogo"
                onChange={handleInputChange}
                value={sellerData.publicationsLogo}
                accept="image/*"
              />
              <div className="mb-4">
                <label
                  htmlFor="nameOfThePublication"
                  className="
            text-white"
                >
                  Name of the Publication
                </label>
                <div className="relative">
                  <FiFile className="absolute top-3 left-3 text-gray-400" />
                  <input
                    id="nameOfThePublication"
                    name="nameOfThePublication"
                    value={sellerData.nameOfThePublication}
                    onChange={handleInputChange}
                    className="border border-gray-400 p-2 rounded w-full pl-10"
                    type="text"
                    placeholder="Name of the Publication"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="publicationsEmail"
                  className="
            text-white"
                >
                  Publications Email
                </label>
                <div className="relative">
                  <FiAtSign className="absolute top-3 left-3 text-gray-400" />
                  <input
                    id="publicationsEmail"
                    name="publicationsEmail"
                    value={sellerData.publicationsEmail}
                    onChange={handleInputChange}
                    className="border border-gray-400 p-2 rounded w-full pl-10"
                    type="email"
                    placeholder="Publications Email"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="publicationsPhoneNumber"
                  className="
            text-white"
                >
                  Publications Phone Number
                </label>
                <div className="relative">
                  <FiPhone className="absolute top-3 left-3 text-gray-400" />
                  <input
                    id="publicationsPhoneNumber"
                    name="publicationsPhoneNumber"
                    value={sellerData.publicationsPhoneNumber}
                    onChange={handleInputChange}
                    className="border border-gray-400 p-2 rounded w-full pl-10"
                    type="text"
                    placeholder="Publications Phone Number"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-white text-black py-2 px-4 rounded-lg w-full transition duration-300 ease-in-out hover:bg-primary hover:text-white mt-4"
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
