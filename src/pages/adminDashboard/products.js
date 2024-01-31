import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line, RiEditBoxLine } from "react-icons/ri";
import Link from "next/link";
import AdminDashboardLayout from "../../components/layouts/adminDashboardLayout";
import RootLayout from "@/components/layouts/RootLayout";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [updateData, setUpdateData] = useState(true);
  useEffect(() => {
    const queryParams = new URLSearchParams({
      search: "",
      genre: "",
      publisher: "",
    });

    fetch(`http://test.notebookprokash.com/products?${queryParams}`, {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [router, updateData]);

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
  console.log(products[0]);
  return (
    <div className="px-2 pt-24 md:mt-0">
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
          {/* <button><RiDeleteBin6Line /></button> */}

          <div className="flex items-center gap-2">
            <p
              onClick={() => deleteProduct(p.id)}
              className="border-[1px] bg-red-600 rounded text-white border-red-800 text-center"
            >
              <button className=" px-1 py-1">
                <RiDeleteBin6Line />
              </button>
            </p>
            <Link href={`/adminDashboard/${p.id}`}>
              <p className="border-[1px] bg-orange-500 rounded text-white border-orange-800 text-center">
                {" "}
                <button className=" px-1 py-1">
                  {" "}
                  <RiEditBoxLine />
                </button>
              </p>{" "}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
AllProducts.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <AdminDashboardLayout>{page}</AdminDashboardLayout>
    </RootLayout>
  );
};
