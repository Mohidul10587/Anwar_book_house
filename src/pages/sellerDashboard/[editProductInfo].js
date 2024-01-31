import React, { useEffect, useState } from "react";
import url from "../../../url";
import { useRouter } from "next/router";
import RootLayout from "@/components/layouts/RootLayout";
import SellerDashboard from "@/components/layouts/sellerDashboardLayout";
import bookCategories from "../../utility/bookCategory";

const EditProductInfo = () => {
  const router = useRouter();
  const productId = router.query.editProductInfo;
  const [selectedCategory, setSelectedCategory] = useState("");

  const [images, setImages] = useState(["", ""]); // Initialize with empty strings for 4 images
  const [selectedImage, setSelectedImage] = useState(null);
  const imageStorageKey = "6c0277e2286d8c4a1059080d1574e2a7";
  const [product, setProduct] = useState({
    name: "",
    unit: "",
    category: "",
    description: "",
    price: 0,
    discount: 0,
    quantity: 1,

    image: ["", ""], // Initialize with empty strings for 4 images
  });

  const [loadingS, setLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      fetch(`${url}/api/v1/products/single-product/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data.data);
          setSelectedCategory(data.data);
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

    // Create a new FormData object

    const file = document.getElementById("photo").files[0];
    const formData = new FormData();
    formData.append("key", imageStorageKey);
    formData.append("image", file);
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${imageStorageKey}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.status == 200) {
      product.image[0] = responseData.data.url;
    }

    // console.log(selectedImage);
    // Create a new product object with updated fields
    const updatedProduct = {
      name: event.target.name.value,

      category: event.target.value,

      description: event.target.description.value,
      price: event.target.priceOfUnit.value,
      discount: parseFloat(event.target.discount.value), // Convert to float
      quantity: product.quantity, // Keep the quantity as it is

      image: product.image, // Use the uploaded image URLs
    };
    console.log(updatedProduct);
    // Now you can send the updatedProduct data to the database using an API call.
    // Uncomment the following code and replace the URL and headers with your API endpoint and headers.

    try {
      const response = await fetch(
        `${url}/api/v1/products/update-product/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
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
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // Set the selected image and update the image preview
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(file); // Read the file as a data URL
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
              <img
                src={selectedImage || product.image[0]} // Use selectedImage if available, otherwise use the product image
                alt={`Product Image`}
                className="mt-2 border border-gray-400 w-64"
              />
              <label className="block text-gray-700 font-bold mb-1">
                Product Image 1
              </label>
              <input
                type="file"
                id={`photo`}
                name={`photo`}
                className="border p-2 border-gray-400 rounded w-72 md:w-[800px]"
                onChange={handleImageChange}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-1"
              >
                Product Name Or Title
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={product.name}
                className="border p-2 border-gray-400 rounded w-72 md:w-[800px]"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="category"
                className="block text-gray-700 font-bold mb-1"
              >
                Category
              </label>
              <select
                className="border p-3 border-gray-400 rounded w-72 md:w-[800px]"
                type="text"
                id="category"
                name="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {bookCategories.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label
                htmlFor="priceOfUnit"
                className="block text-gray-700 font-bold mb-1"
              >
                Price Of Unit
              </label>
              <input
                className="border p-2 border-gray-400 rounded w-72 md:w-[800px]"
                type="number"
                id="priceOfUnit"
                name="priceOfUnit"
                defaultValue={product.price}
                required
              />
            </div>
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
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-1"
              >
                Description
              </label>
              <textarea
                className="border p-2 border-gray-400 rounded w-72 md:w-[800px]"
                type="text"
                id="description"
                name="description"
                rows={10}
                defaultValue={product.description}
                required
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="border-secondary p-2 bg-secondary text-white font-bold  border py-2 hover:bg-primary w-full px-8"
              >
                UPDATE PRODUCT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

EditProductInfo.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <SellerDashboard>{page}</SellerDashboard>
    </RootLayout>
  );
};
export default EditProductInfo;
