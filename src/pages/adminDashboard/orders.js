// pages/adminDashboard/orders.js
import RootLayout from "@/components/layouts/RootLayout";
import AdminDashboardLayout from "@/components/layouts/adminDashboardLayout";
import Link from "next/link";
import { FaClock, FaShoppingCart, FaTruck, FaCheck } from "react-icons/fa";

const getStatusIcon = (status) => {
  switch (status) {
    case "Processing":
      return <FaClock className="text-yellow-500 mr-1" />;
    case "Shipped":
      return <FaTruck className="text-blue-500 mr-1" />;
    case "Delivered":
      return <FaCheck className="text-green-500 mr-1" />;
    default:
      return <FaShoppingCart className="text-gray-500 mr-1" />;
  }
};

const Orders = ({ orders }) => {
  console.log(orders);
  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Manage Orders</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-primary p-4 rounded-md shadow-md flex flex-col justify-between bg-white transition duration-500 ease-in-out transform hover:scale-105"
          >
            <div>
              <p className="text-lg font-semibold mb-2">
                {order.shippingInfo.fullName}
              </p>
              <p className="text-gray-600 mb-2">
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-2">
                Time: {new Date(order.createdAt).toLocaleTimeString()}
              </p>
              <p className="text-gray-600 mb-2">
                Quantity: {order.totalQuantity}
              </p>
              <p className="text-gray-600 mb-2">
                {/* Total Price: ${order.totalPrice.toFixed(2)} */}
              </p>
              <p className="text-gray-600 mb-2 flex items-center">
                {getStatusIcon(order.status)}
                <span className="ml-1">{order.status}</span>
              </p>
              {/* Display other order details as needed */}
            </div>

            <div className="mt-4">
              <Link href={`/adminDashboard/${order.id}`}>
                <span className=" rounded px-4 py-2 text-center block bg-primary text-white cursor-pointer ">
                  View Details
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const response = await fetch("http://test.notebookprokash.com/order");
    if (response.ok) {
      const data = await response.json();
      const formattedOrders = data.map((order) => ({
        ...order,
        products: JSON.parse(order.products),
        shippingInfo: JSON.parse(order.shippingInfo),
      }));
      return {
        props: {
          orders: formattedOrders,
        },
      };
    } else {
      console.error("Failed to fetch orders:", response.statusText);
      return {
        props: {
          orders: [],
        },
      };
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    return {
      props: {
        orders: [],
      },
      revalidate: 10,
    };
  }
}

Orders.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <AdminDashboardLayout>{page}</AdminDashboardLayout>
    </RootLayout>
  );
};

export default Orders;
