import Link from "next/link";
import {
  FaBars,
  FaHome,
  FaPhone,
  FaTimes,
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";
import { GiArcheryTarget, GiGearHammer } from "react-icons/gi";
import { FiBookOpen } from "react-icons/fi";
import { AiOutlineStop, AiOutlinePhone } from "react-icons/ai";
import { MdPostAdd } from "react-icons/md";
import { useRouter } from "next/router";
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import Image from "next/image";
import bookCategories from "@/utility/bookCategory";
import { BiBookReader } from "react-icons/bi";
const Header = ({ props }) => {
  // Access the router instance
  const router = useRouter();
  // Get the current page URL
  const currentUrl = router.asPath;

  useEffect(() => {
    if (currentUrl != "/search") {
      props.setSearchQuery("");
    }
  }, [currentUrl, props.props]);
  const [sidebar, setSidebar] = useState(false);
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const handleSearch = () => {
    // Navigate to the search page with the search text as a query parameter
    router.push(`/search`);
  };

  return (
    <div className="">
      <div className="bg-primary fixed z-10 inset-x-0 items-center px-6 pt-4 pb-4 shadow-lg text-white top-0">
        <div className="flex justify-between items-center">
          <div className="md:text-2xl flex items-center">
            <button className="p-3 text-xl" onClick={handleSidebar}>
              {/* Use a more modern icon */}
              <FaBars />
            </button>
            <Link href="/">
              <p className="cursor-pointer font-bold text-2xl text-white">
                Book Shop
              </p>
            </Link>
          </div>
          <div className="flex p-2 bg-white justify-between items-center border border-gray-300 rounded text-black w-[450px]">
            <input
              type="text"
              placeholder="Search"
              className=" w-[380px] outline-none"
              value={props.searchQuery}
              onChange={(e) => props.setSearchQuery(e.target.value)}
            />
            <IoSearch
              className=" right-2 top-2 p-1 rounded bg-primary text-white text-2xl cursor-pointer"
              onClick={handleSearch}
            />
          </div>
          <div className="flex space-x-4 items-center">
            {/* Update navbar links */}
            <Link href="/cart">
              <div className="flex">
                <p className="cursor-pointer">
                  <FaShoppingCart />
                </p>
                {props.cartProductQuantity > 0 && (
                  <p className="-mt-4 text-xs  border rounded-full bg-rose-800 w-6 h-6 flex justify-center items-center">
                    {" "}
                    <span> {props.cartProductQuantity}</span>
                  </p>
                )}
              </div>
            </Link>
            <Link href="/adminDashboard">
              <p className="cursor-pointer">Admin</p>
            </Link>
            <Link href="/sellerDashboard">
              <p className="cursor-pointer">Seller</p>
            </Link>
          </div>
        </div>
      </div>

      <div>
        <div
          className={
            sidebar
              ? "cursor-pointer fixed z-10 inset-0 opacity-70 visible"
              : "hidden opacity-0"
          }
          onClick={handleSidebar}
        ></div>

        <div
          className={`bg-secondary text-white z-50 duration-500 fixed md:top-[78px] top-0 inset-y-0 py-4  transition-left w-[270px]${
            sidebar ? " left-0  ease-out" : " -left-full ease-in"
          }`}
        >
          <div className="mb-4 block md:hidden">
            <div className="flex justify-center items-center">
              <BiBookReader className="text-5xl"></BiBookReader>
            </div>
            <p className="text-center font-bold"> Book Shop</p>
          </div>

          {bookCategories.map((category, index) => (
            <li
              key={index}
              style={{ listStyle: "none" }}
              onClick={handleSidebar}
            >
              <Link
                href={`/search`}
                onClick={() => {
                  props.setGenre(category);
                }}
              >
                <p className="font-medium inline-flex items-center px-4 py-2 transition w-full hover:bg-white hover:text-gray-800">
                  <BiBookReader className="mr-3"></BiBookReader>
                  {category}
                </p>
              </Link>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
