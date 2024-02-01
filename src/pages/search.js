// pages/products.js
import RootLayout from "@/components/layouts/RootLayout";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi"; // Example: Replace with your desired icons
import { BsFilter } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import ProductCard from "@/components/card/productCard";
import { useRouter } from "next/router";
import genres from "@/utility/bookCategory";
import Select from "react-select"; // Add this lineclear

const ProductsPage = ({ searchQuery, genre, setGenre }) => {
  const router = useRouter();
  const [search, setSearch] = useState(router.query.searchText);
  // const [genre, setGenre] = useState("");
  const [publisher, setPublisher] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const publications = [
    "Penguin Random House",
    "HarperCollins Publishers",
    "Simon & Schuster",
    "Hachette Livre",
    "Macmillan Publishers",
    "Wiley",
    "Oxford University Press",
    "Pearson Education",
    "Scholastic Corporation",
    "Houghton Mifflin Harcourt",
    "Bloomsbury Publishing",
    "Cambridge University Press",
    "Pan Macmillan",
    "Allen & Unwin",
    "John Wiley & Sons",
  ];

  // You can use this array in your component as needed
  const fetchData = async () => {
    try {
      const queryParams = new URLSearchParams({
        search: searchQuery,
        genre,
        publisher,
      });

      const response = await fetch(
        `https://test.notebookprokash.com/products?${queryParams}`
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setProducts(data.products);
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
  useEffect(() => {
    fetchData();
  }, [searchQuery, genre, publisher]);
  if (products.length == 0) {
    return (
      <div className="container mx-auto p-4 pt-24 min-h-screen">
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
              Publisher:
              <select
                value={genre}
                onChange={(e) => setPublisher(e.target.value)}
                className="border border-gray-300 p-2 ml-2"
              >
                <option value="">Select Publisher</option>
                {publications.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-center">
          There is no product
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 pt-24 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Product Search and Filter</h1>
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
            Publisher:
            <select
              value={genre}
              onChange={(e) => setPublisher(e.target.value)}
              className="border border-gray-300 p-2 ml-2"
            >
              <option value="">Select Publisher</option>
              {publications.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Products:</h2>
        <div className="grid md:grid-cols-4 lg:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-2  mb-10 place-content-center">
          {products.map((p) => (
            <ProductCard p={p} key={p.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

ProductsPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default ProductsPage;
