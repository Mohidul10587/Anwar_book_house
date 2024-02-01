import { useRouter } from "next/router";
import React, { useState } from "react";
import { Image } from "next/image";
import RootLayout from "@/components/layouts/RootLayout";

const ProductDetails = ({
  product,
  cartProductQuantity,
  setCartProductQuantity,
}) => {
  const router = useRouter();
  const [hoveredImage, setHoveredImage] = useState(null);

  const addToCartOfLocalStorage = () => {
    // Get the existing cart from local storage or initialize an empty array
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product is already in the cart
    const existingProductIndex = existingCart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      // If the product is already in the cart, create a new object with updated quantity
      const updatedCart = [...existingCart];
      updatedCart[existingProductIndex] = {
        ...existingCart[existingProductIndex],
        quantity: existingCart[existingProductIndex].quantity + 1,
      };

      // Save the updated cart to local storage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartProductQuantity(cartProductQuantity + 1);
      alert("Product added to cart");
      // Optionally, update the state or perform other actions
      // setCart(updatedCart);
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      const updatedCart = [...existingCart, { ...product, quantity: 1 }];

      // Save the updated cart to local storage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCartProductQuantity(cartProductQuantity + 1);
      alert("Product added to cart");
      // Optionally, update the state or perform other actions
      // setCart(updatedCart);
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen pt-4 md:pt-32">
      <div className="flex justify-center ">
        <div className="md:flex px-4 md:px-10 mb-10">
          <div>
            <img
              className="md:w-[420px] w-full h-[320px] border border-gray-400 "
              src={`https://test.notebookprokash.com/uploads/${product.image}`}
              alt=""
            />
          </div>

          <div className="w-full md:ml-10 border-black relative">
            <p className="text-2xl">
              {product?.name} Multicolor Shoulder Bag For Men Boys School Bag
              College Bag Backpack 17.6 Inch - Bag For Boys
            </p>
            <p>
              <span>***** </span>
              <span>4 Ratings</span>
            </p>
            <p>৳ 500-40%</p>
            <p className="text-3xl">৳ {product.price}</p>

            <div className="sm:absolute bottom-0 w-full sm:flex gap-4">
              <button className="mt-3 w-56 hover:bg-primary hover:text-white border border-primary rounded p-2">
                Buy Now
              </button>
              <button
                onClick={addToCartOfLocalStorage}
                className="mt-3 w-56 hover:bg-primary hover:text-white border border-primary rounded p-2"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-justify px-4 md:px-10">
        <p className="mt-3">Description:</p>
        <p>{product?.description}</p>
      </div>
    </div>
  );
};

ProductDetails.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export async function getStaticPaths() {
  const response = await fetch("https://test.notebookprokash.com/products");
  const data = await response.json();
  const paths = data.products.map((product) => ({
    params: { productDetails: product.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  try {
    const response = await fetch(
      `https://test.notebookprokash.com/products/single_product/${params.productDetails}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch data from the API (${response.status})`);
    }

    const data = await response.json();
    return {
      props: {
        product: data.product,
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

export default ProductDetails;
