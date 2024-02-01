// pages/sellers.js

import { useState, useEffect } from "react";
import RootLayout from "../../components/layouts/RootLayout";
import AdminDashboardLayout from "@/components/layouts/adminDashboardLayout";
import Link from "next/link";

const UserManagement = () => {
  const [sellers, setUsers] = useState([]);
  const [filteredSellers, setFilteredSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null);

  const handleSearch = (query) => {
    const filtered = sellers.filter((seller) =>
      seller.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSellers(filtered);
  };

  // hhh
  useEffect(() => {
    // Fetch the list of sellers from your server
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://test.notebookprokash.com/seller/all"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch sellers");
        }

        const data = await response.json();
        console.log(data);
        setUsers(data.sellers);
      } catch (error) {
        console.error("Error fetching sellers:", error);
      }
    };

    fetchUsers();
  }, []);
  const handleDeleteUser = async (sellerId) => {
    try {
      // Send a request to delete the seller
      const response = await fetch(
        `https://test.notebookprokash.com/seller/${sellerId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete seller");
      }

      // Update the seller list after deletion
      setUsers((prevUsers) =>
        prevUsers.filter((seller) => seller.id !== sellerId)
      );

      // Reset the selected seller
      setSelectedSeller(null);
    } catch (error) {
      console.error("Error deleting seller:", error);
    }
  };

  return (
    <div className="mt-24">
      <h1>User Management</h1>
      <input
        className="border border-black p-2 rounded"
        type="text"
        placeholder="Search by name..."
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className="flex justify-between border border-black p-2 m-1 font-bold">
        <p>Name </p>
        <p>Email</p>
        <button>Delete</button>
        <p> Details</p>
      </div>
      <ul>
        {(filteredSellers.length > 0 ? filteredSellers : sellers)?.map(
          (seller) => (
            <div
              className="flex justify-between border border-black p-2 m-1"
              key={seller.id}
            >
              <p> {seller.name} </p>
              <p>{seller.email}</p>
              <button onClick={() => handleDeleteUser(seller.id)}>
                Delete
              </button>
              <Link href={`/adminDashboard/sellerDetails/${seller.id}`}>
                Details
              </Link>
            </div>
          )
        )}
      </ul>
    </div>
  );
};

UserManagement.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <AdminDashboardLayout>{page}</AdminDashboardLayout>
    </RootLayout>
  );
};
export default UserManagement;
const SellerDetails = ({ seller }) => (
  <div>
    <p>Name: {seller.name}</p>
    <p>Email: {seller.email}</p>
    <p>Income: {seller.income}</p>
    {/* Add more details as needed */}
  </div>
);
