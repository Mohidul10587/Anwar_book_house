import { useEffect, useState } from "react";
import RootLayout from "@/components/layouts/RootLayout";
import SellerDashboard from "@/components/layouts/sellerDashboardLayout";
import { FiBook } from "react-icons/fi"; // Assuming FiBook represents a book icon
import Image from "next/image";

const SoldProducts = ({ seller }) => {
  const [soldBooks, setSoldBooks] = useState([]);

  useEffect(() => {
    const fetchSoldBooks = async () => {
      const sellerEmail = seller.email;
      const soldBooksResponse = await fetch(
        `https://test.notebookprokash.com/soldBooks/${sellerEmail}`
      );
      const soldBooksData = await soldBooksResponse.json();
      setSoldBooks(soldBooksData);
    };

    fetchSoldBooks();
  }, []);

  return (
    <div className="bg-white p-8 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-6">Sold Books</h1>

      {soldBooks.map((book) => (
        <div key={book.id} className="mb-6 border-b pb-4">
          <div className="flex items-center mb-2">
            <FiBook className="text-blue-500 mr-2" />
            <p className="text-xl font-semibold">
              {JSON.parse(book.product).name}
            </p>
          </div>

          <div className="flex items-center">
            <Image
              className="border border-gray-300 rounded"
              src={`https://test.notebookprokash.com/uploads/${
                JSON.parse(book.product).image
              }`}
              width={150}
              height={150}
              alt={JSON.parse(book.product).name}
            />

            <div className="ml-4">
              <p className="text-gray-700">Quantity: {book.quantity}</p>
              <p className="text-gray-700">Total Price: {book.totalPrice}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

SoldProducts.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <SellerDashboard>{page}</SellerDashboard>
    </RootLayout>
  );
};

export default SoldProducts;
