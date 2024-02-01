import { useRouter } from "next/router";
import React, { useState } from "react";
import { Image } from "next/image";
import RootLayout from "@/components/layouts/RootLayout";
import AdminDashboardLayout from "@/components/layouts/adminDashboardLayout";

const SellerDetails = ({ seller }) => {
  console.log(seller);
  if (!seller) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen pt-4 md:pt-32">
      <div className="flex justify-center ">
        <div className="md:flex px-4 md:px-10 mb-10">
          <div>
            <img
              className="md:w-[420px] w-full h-[320px] border border-gray-400 "
              src={`https://test.notebookprokash.com/uploads/${seller.image}`}
              alt=""
            />
          </div>

          <div className="w-full md:ml-10 border-black relative">
            <p className="text-2xl">{seller?.name}</p>
            <p>{seller.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

SellerDetails.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <AdminDashboardLayout>{page}</AdminDashboardLayout>
    </RootLayout>
  );
};

export async function getStaticPaths() {
  const response = await fetch("https://test.notebookprokash.com/seller/all");
  const data = await response.json();
  const paths = data.sellers.map((seller) => ({
    params: { sellerDetails: seller.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  try {
    const response = await fetch(
      `https://test.notebookprokash.com/seller/getSingleSeller/${params.sellerDetails}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch data from the API (${response.status})`);
    }

    const data = await response.json();
    return {
      props: {
        seller: data.seller,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      notFound: true,
    };
  }
}

export default SellerDetails;
