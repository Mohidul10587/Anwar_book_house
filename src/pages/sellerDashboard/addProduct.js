import RootLayout from "@/components/layouts/RootLayout";
import SellerDashboard from "@/components/layouts/sellerDashboardLayout";
import publications from "@/utility/publications";
import { useState } from "react";
import { BiUpload } from "react-icons/bi";

const ProductUploadForm = ({ seller }) => {
  const genres = [
    "ধর্মীয়",
    "উপন্যাস",
    "কবিতা",
    "স্মৃতিরচিত্র",
    "গল্প",
    "প্রবন্ধ",
    "বিজ্ঞান গবেষণা",
    "ইতিহাস",
    "রোমান্টিক",
    "ফ্যান্টাসি",
    "স্বাস্থ্য ও কর্মসংস্কার",
    "কৃষি ও গার্ডেনিং",
    "কোমিক্স ও গ্রাফিক নভেল",
    "শিক্ষা",
  ];

  const [productData, setProductData] = useState({
    name: "",
    writer: "",
    publications: "",
    genre: "",
    description: "",
    price: 0,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductData((prevData) => ({ ...prevData, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const isPriceValid = !isNaN(parseFloat(productData.price));

    // if (!isPriceValid) {
    //   console.error("Invalid price or offer");
    //   return;
    // }

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("writer", productData.writer);
    formData.append("publications", productData.publications);
    formData.append("genre", productData.genre);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("image", productData.image);
    formData.append("sellerEmail", seller.email);
    formData.append("quantity", 1);
    formData.append("offerBySeller", 0);
    formData.append("offerByAdmin", 0);

    try {
      const response = await fetch(
        "https://test.notebookprokash.com/products",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const product = await response.json(); // await the JSON response
        console.log("Product uploaded successfully:", product);
        // You can redirect or perform other actions after a successful upload
      } else {
        console.error("Failed to upload product");
      }
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-8 p-4 border rounded-md shadow-md"
    >
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={productData.name}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md border-black"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={productData.description}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md border-black"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price:
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={productData.price}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md border-black"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="writer"
          className="block text-sm font-medium text-gray-700"
        >
          Writer:
        </label>
        <input
          type="text"
          id="writer"
          name="writer"
          value={productData.writer}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md border-black"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="publications"
          className="block text-sm font-medium text-gray-700"
        >
          publications:
        </label>
        <select
          id="publications"
          name="publications"
          value={productData.publications}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md border-black"
        >
          <option value="" disabled>
            Select publications
          </option>
          {publications.map((genreOption) => (
            <option key={genreOption} value={genreOption}>
              {genreOption}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="genre"
          className="block text-sm font-medium text-gray-700"
        >
          Genre:
        </label>
        <select
          id="genre"
          name="genre"
          value={productData.genre}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md border-black"
        >
          <option value="" disabled>
            Select Genre
          </option>
          {genres.map((genreOption) => (
            <option key={genreOption} value={genreOption}>
              {genreOption}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Image:
        </label>
        <div className="mt-1 flex items-center">
          <label
            htmlFor="image"
            className="cursor-pointer bg-white rounded-md border border-gray-400 p-2 flex items-center"
          >
            <BiUpload className="mr-2" />
            <span className="text-sm">Choose File</span>
            <input
              id="image"
              name="image"
              type="file"
              className="sr-only"
              onChange={handleImageChange}
            />
          </label>
          {productData.image && (
            <span className="ml-2 text-gray-600">{productData.image.name}</span>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Upload Product
      </button>
    </form>
  );
};
ProductUploadForm.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <SellerDashboard>{page}</SellerDashboard>
    </RootLayout>
  );
};
export default ProductUploadForm;
