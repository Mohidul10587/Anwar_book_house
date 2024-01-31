import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RootLayout from "@/components/layouts/RootLayout";
import SellerDashboard from "@/components/layouts/sellerDashboardLayout";
import bookCategories from "../../../utility/bookCategory";
import url from "../../../../url";

const CreateOfferProduct = () => {
  const router = useRouter();
  const productId = router.query.createOfferProduct;

  const imageStorageKey = "6c0277e2286d8c4a1059080d1574e2a7";
  const [product, setProduct] = useState({
    discount: 0,
    image: ["", ""], // Initialize with empty strings for 4 images
  });

  const [loadingS, setLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      fetch(`${url}/api/v1/products/single-product/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data.data);

          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          setLoading(false);
        });
    }
  }, [productId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    product.discount = parseFloat(event.target.discount.value);
    console.log(product);
    try {
      const response = await fetch(
        `${url}/api/v1/offerProducts/create-offer-product/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );

      const data = await response.json();

      if (data.message) {
        alert(data.message);
      } else {
        alert("Product updated successfully");
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      alert("An error occurred while updating the product");
    }
  };

  if (loadingS)
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center">
        <p className="text-xl"> Loading...</p>
      </div>
    );
  return (
    <div className="-mt-24 md:mt-0">
      <div>
        <h1 className="text-center text-xl mb-5 ">UPDATE PRODUCT</h1>
        <div className="flex justify-center">
          <form onSubmit={handleSubmit} className="  border-[1px]  p-4 rounded">
            <div className="mb-6">
              <label
                htmlFor="discount"
                className="block text-gray-700 font-bold mb-1"
              >
                Discount (%)
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                className="border p-2 border-gray-400 rounded w-72 md:w-[800px]"
                defaultValue={product.discount} // Set default value from product object
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="border-secondary p-2 bg-secondary text-white font-bold  border py-2 hover:bg-primary w-full px-8"
              >
                ADD TO OFFER PRODUCT LIST
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

CreateOfferProduct.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <SellerDashboard>{page}</SellerDashboard>
    </RootLayout>
  );
};
export default CreateOfferProduct;
