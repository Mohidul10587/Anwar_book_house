import Link from "next/link";
import { FaTachometerAlt, FaUser } from "react-icons/fa";
import { cloneElement, useEffect, useState } from "react";
import { useRouter } from "next/router";

const SellerDashboard = ({ children, searchQuery }) => {
  const router = useRouter();
  const [sidebar, setSidebar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "https://test.notebookprokash.com/seller/checkSeller",
        {
          method: "GET",
          headers: {
            Authorization: token,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log(data);
        setSeller(data.seller);
        setLoading(false);
      } else {
        router.push("/sellerLogin");
      }
    };

    fetchData();
  }, [router]);

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    router.push("/sellerLogin");
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
    <div className="flex min-h-screen">
      <div
        className={`bg-[#297783] text-white md:hidden ${
          sidebar ? "fixed" : ""
        } top-[78px] inset-y-0 py-4 transition-left w-[270px]${
          sidebar ? " left-0 ease-out" : " -left-full ease-in"
        }`}
      >
        <Link href="/sellerDashboard">
          <p className="ml-2 mb-6 border-b" onClick={handleSidebar}>
            <FaUser className="mr-2 inline-block border-white align-middle" />
            <span className="text-white hover:text-gray-300">Dashboard</span>
          </p>
        </Link>
        <Link href="/sellerDashboard/addProduct">
          <p className="ml-2 mb-6 border-b" onClick={handleSidebar}>
            <FaUser className="mr-2 inline-block border-white align-middle" />
            <span className="text-white hover:text-gray-300">
              Upload Product
            </span>
          </p>
        </Link>
        <Link href="/sellerDashboard/allProducts">
          <p className="ml-2 mb-6 border-b" onClick={handleSidebar}>
            <FaUser className="mr-2 inline-block border-white align-middle" />
            <span className="text-white hover:text-gray-300">All Products</span>
          </p>
        </Link>
        <p className="ml-2 mb-6 border-b" onClick={handleLogOut}>
          <FaUser className="mr-2 inline-block border-white align-middle" />
          Logout
        </p>
      </div>

      <div className="hidden md:block w-2/12 pt-24 bg-[#297783] text-white border-r border-gray-700 px-4">
        <Link href="/sellerDashboard">
          <p className="ml-2 mb-6 border-b" onClick={handleSidebar}>
            <FaTachometerAlt className="mr-2 inline-block border-white align-middle" />
            <span className="text-white hover:text-gray-300">Dashboard</span>
          </p>
        </Link>
        <Link href="/sellerDashboard/addProduct">
          <p className="ml-2 mb-6 border-b" onClick={handleSidebar}>
            <FaUser className="mr-2 inline-block border-white align-middle" />
            <span className="text-white hover:text-gray-300">
              Upload Product
            </span>
          </p>
        </Link>
        <Link href="/sellerDashboard/allProducts">
          <p className="ml-2 mb-6 border-b" onClick={handleSidebar}>
            <FaUser className="mr-2 inline-block border-white align-middle" />
            <span className="text-white hover:text-gray-300">All Products</span>
          </p>
        </Link>
        <p className="ml-2 mb-6 border-b" onClick={handleLogOut}>
          <FaUser className="mr-2 inline-block border-white align-middle" />
          Logout
        </p>
      </div>

      <div className="px-2 md:w-10/12 py-24">
        {cloneElement(children, {
          seller: seller,
          searchQuery,
        })}
      </div>
    </div>
  );
};

export default SellerDashboard;
