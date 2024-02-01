import Link from "next/link";
import {
  FaChartBar,
  FaSignOutAlt,
  FaTachometerAlt,
  FaUser,
  FaUserPlus,
  FaUsers,
} from "react-icons/fa";
import React, { cloneElement, useEffect, useState } from "react";
import { useRouter } from "next/router";

const AdminDashboardLayout = ({ children }) => {
  const router = useRouter();
  const [sidebar, setSidebar] = useState(true);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "https://test.notebookprokash.com/admin/checkAdmin",
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.success) {
        setAdmin(data.admin);
        setLoading(false);
      } else {
        router.push("/adminLogin");
      }
    };

    fetchData();
  }, [router]);

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    router.push("/adminLogin");
  };

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-24 md:hidden">
        <button
          className={`ml-2 border border-black rounded px-2 ${
            sidebar ? "hidden" : "block"
          }`}
          onClick={handleSidebar}
        >
          Dashboard
        </button>
      </div>

      <div className="flex min-h-screen">
        {/* for mobile */}
        <div
          className={
            sidebar
              ? "cursor-pointer fixed z-10 inset-0 opacity-70 visible"
              : "hidden opacity-0"
          }
          onClick={handleSidebar}
        ></div>
        <div
          className={`bg-[#297783] text-white z-20 duration-500 fixed md:hidden top-[78px] inset-y-0 py-4 transition-left w-[270px]${
            sidebar ? " left-0 ease-out" : " -left-full ease-in"
          }`}
        >
          <Link href="/adminDashboard">
            <p className="ml-2 mb-6 border-b">
              <FaTachometerAlt className="mr-2 inline-block border-white align-middle" />
              <span className="text-white hover:text-gray-300">Dashboard</span>
            </p>
          </Link>

          <Link href="/adminDashboard/sellerManagement">
            <p className="ml-2 mb-6 border-b">
              <FaUser className="mr-2 inline-block border-white align-middle" />
              <span className="text-white hover:text-gray-300">
                User Management
              </span>
            </p>
          </Link>

          <Link href="/adminDashboard/adminSignUp">
            <p className="ml-2 mb-6 border-b">
              <FaUser className="mr-2 inline-block border-white align-middle" />
              <span className="text-white hover:text-gray-300">
                Create New Admin
              </span>
            </p>
          </Link>

          <p className="ml-2 mb-6 border-b" onClick={handleLogOut}>
            <FaUser className="mr-2 inline-block border-white align-middle" />
            <span className="text-white hover:text-gray-300">Logout</span>
          </p>
        </div>

        {/* for desktop */}
        <div className="hidden md:block w-2/12 pt-24 bg-[#297783] text-white border-r border-gray-700 px-4">
          <Link href="/adminDashboard">
            <p className="ml-2 mb-6 border-b">
              <FaChartBar className="mr-2 inline-block border-white align-middle" />
              <span className="text-white hover:text-gray-300">Dashboard</span>
            </p>
          </Link>

          <Link href="/adminDashboard/products">
            <p className="ml-2 mb-6 border-b">
              <FaChartBar className="mr-2 inline-block border-white align-middle" />
              <span className="text-white hover:text-gray-300">
                Products Manage
              </span>
            </p>
          </Link>

          <Link href="/adminDashboard/sellerManagement">
            <p className="ml-2 mb-6 border-b">
              <FaUsers className="mr-2 inline-block border-white align-middle" />
              <span className="text-white hover:text-gray-300">
                Seller Management
              </span>
            </p>
          </Link>

          <Link href="/adminDashboard/adminSignUp">
            <p className="ml-2 mb-6 border-b">
              <FaUserPlus className="mr-2 inline-block border-white align-middle" />
              <span className="text-white hover:text-gray-300">
                Create New Admin
              </span>
            </p>
          </Link>

          <Link href="/adminDashboard/orders">
            <p className="ml-2 mb-6 border-b">
              <FaUser className="mr-2 inline-block border-white align-middle" />
              <span className="text-white hover:text-gray-300">All Orders</span>
            </p>
          </Link>

          <p className="ml-2 mb-6 border-b" onClick={handleLogOut}>
            <FaSignOutAlt className="mr-2 inline-block border-white align-middle" />
            <span className="text-white hover:text-gray-300">Logout</span>
          </p>
        </div>

        <div className="px-2 md:w-10/12 ">
          {cloneElement(children, {
            admin: admin,
          })}
        </div>
      </div>
    </>
  );
};

export default AdminDashboardLayout;
