import dashboardLayout from "../../components/layouts/adminDashboardLayout";
import url from "../../../url";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line, RiEditBoxLine } from "react-icons/ri";

import { MdOutlineLocalOffer } from "react-icons/md";

import Link from "next/link";
import RootLayout from "@/components/layouts/RootLayout";
import SellerDashboard from "@/components/layouts/sellerDashboardLayout";
import { BsFilter } from "react-icons/bs";
import Select from "react-select"; // Add this lineclear
import genres from "@/utility/bookCategory";
import publications from "@/utility/publications";
const AllProducts = ({ seller, searchQuery }) => {
  console.log(searchQuery);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [updateData, setUpdateData] = useState(true);
  const [genre, setGenre] = useState("");
  const [publisher, setPublisher] = useState("");

  const [selectedPublisher, setSelectedPublisher] = useState(null);

  const queryParams = new URLSearchParams({
    search: searchQuery,
    genre,
    publisher,
    sellerEmail: seller.email,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://test.notebookprokash.com/products?${queryParams}`
        );
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setProducts(data.products);
          setLoading(false);
        } else {
          setProducts([]);
          console.error(
            "Error fetching products:",
            data.error || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [searchQuery, genre, publisher, updateData]);

  const deleteProduct = async (productId) => {
    try {
      const res = await fetch(
        `http://test.notebookprokash.com/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete product");
      }
      setUpdateData(!updateData);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  if (loading)
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center">
        <p className="text-xl"> Loading...</p>
      </div>
    );

  return (
    <div className="px-2 -mt-24 md:mt-0">
      <div className="flex flex-wrap mb-4">
        <div className="mr-2 mb-2">
          <label className="flex items-center">
            <BsFilter className="mr-2" />
            Genre:
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="border border-gray-300 p-2 ml-2"
            >
              <option value="">Select Genre</option>
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mr-2 mb-2">
          <label className="flex items-center">
            <BsFilter className="mr-2" />
            Genre:
            <select
              value={genre}
              onChange={(e) => setPublisher(e.target.value)}
              className="border border-gray-300 p-2 ml-2"
            >
              <option value="">Select publication</option>
              {publications.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className="flex justify-between md:px-10 px-4 border py-4 border-black items-center">
        <div className="">
          <p>Img</p>
        </div>
        <p>Name</p>
        <button>Del</button>
      </div>

      {products.map((p) => (
        <div
          key={p.id}
          className="flex justify-between md:px-10 px-4 py-2 mb-2 items-center border border-black"
        >
          <div className="w-12 h-12">
            <img
              src={`http://test.notebookprokash.com/uploads/${p.image}`}
              className="w-full h-full  rounded-full"
              alt=""
            />
          </div>
          <p className="md:w-full w-44  ml-2 md:text-center">{p.name}</p>

          <div className="flex items-center gap-2">
            <Link href={`/sellerDashboard/offer/${p.id}`} title="create offer">
              <p className="border-[1px] bg-green-600 rounded text-white border-green-800 text-center">
                {" "}
                <button className=" px-1 py-1">
                  {" "}
                  <MdOutlineLocalOffer />
                </button>
              </p>{" "}
            </Link>
            <Link href={`/sellerDashboard/${p.id}`} title="Edit">
              <p className="border-[1px] bg-orange-500 rounded text-white border-orange-800 text-center">
                {" "}
                <button className=" px-1 py-1">
                  {" "}
                  <RiEditBoxLine />
                </button>
              </p>{" "}
            </Link>

            <p
              onClick={() => deleteProduct(p.id)}
              className="border-[1px] bg-red-600 rounded text-white border-red-800 text-center"
              title="Delete"
            >
              <button className=" px-1 py-1">
                <RiDeleteBin6Line />
              </button>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

AllProducts.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <SellerDashboard>{page}</SellerDashboard>
    </RootLayout>
  );
};

export default AllProducts;
