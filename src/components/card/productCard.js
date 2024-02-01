import Image from "next/image";
import Link from "next/link";
import React from "react";
// import url from "../../../url";
import { AiFillStar } from "react-icons/ai";

const ProductCard = ({ p }) => {
  return (
    <div className="transform hover:scale-105 transition-transform ease-in-out duration-700">
      <Link href={`/productDetails/${p.id}`}>
        <div className="border border-gray-400 sm:w-[195px] rounded-lg overflow-hidden duration-700">
          {/* Add a div for aspect ratio */}
          <div
            className="relative w-full h-72 "
            style={{ paddingBottom: "100%" }}
          >
            <Image
              src={`https://test.notebookprokash.com/uploads/${p.image}`}
              alt={p.name}
              fill
              objectFit="cover"
              className="rounded-t-lg border border-b-gray-300 p-1"
            />
          </div>
          <div className="pl-2 my-2">
            <p className="">
              ৳ {p.name.slice(0, 18)}
              {p.name.length > 18 && "..."}
            </p>
            <p className="text-2xl text-orange-700">৳ {p.price}</p>
            <p className="text-sm font-light">
              <del>500</del> <span>-40%</span>
            </p>
            <div className="flex">
              <AiFillStar className="text-yellow-500" />
              <AiFillStar className="text-yellow-500" />
              <AiFillStar className="text-yellow-500" />
              <AiFillStar className="text-yellow-500" />
              <AiFillStar className="text-yellow-500" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
