// pages/adminDashboard/[orderId].js
import RootLayout from "@/components/layouts/RootLayout";
import AdminDashboardLayout from "@/components/layouts/adminDashboardLayout";
import { useRouter } from "next/router";
import { FaProductHunt, FaUser, FaMapMarkerAlt } from "react-icons/fa"; // Importing React Icons

const OrderPage = ({ order }) => {
  const router = useRouter();

  if (!order) {
    return <p>Loading...</p>;
  }

  // Parse the JSON strings in products and shippingInfo fields
  const products = JSON.parse(order.products);
  const shippingInfo = JSON.parse(order.shippingInfo);

  return (
    <div className="pt-24 container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <div className="bg-white p-6 rounded-md shadow-md">
        <p className="text-lg font-semibold mb-4">Order ID: {order.id}</p>
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <div className="flex items-start mb-4">
            <FaUser className="mr-2 mt-1" />
            <p className="text-gray-800">{shippingInfo.fullName}</p>
          </div>
          <div className="flex items-start mb-4">
            <FaMapMarkerAlt className="mr-2 mt-1" />
            <p className="text-gray-800">{shippingInfo.address}</p>
          </div>
          <div className="flex items-start">
            <p className="text-gray-800">{shippingInfo.city}</p>
            <p className="mx-2 text-gray-800">|</p>
            <p className="text-gray-800">{shippingInfo.postalCode}</p>
          </div>
          {/* Display other order details as needed */}
        </section>
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <li key={product.id} className="mb-4 p-4 border rounded-md">
                <div className="mb-2">
                  <img
                    src={`http://test.notebookprokash.com/uploads/${product.image}`}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.writer}</p>
                {/* Add more product details as needed */}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

OrderPage.getLayout = function getLayout(page) {
  return (
    <RootLayout>
      <AdminDashboardLayout>{page}</AdminDashboardLayout>
    </RootLayout>
  );
};

export async function getStaticPaths() {
  // Fetch the list of all order IDs
  const response = await fetch("http://test.notebookprokash.com/order");
  const orderIds = await response.json();

  // Generate paths based on order IDs
  const paths = orderIds.map((orderId) => ({
    params: { orderId: orderId.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const { orderId } = params;

  try {
    // Fetch the order data using orderId
    const response = await fetch(
      `http://test.notebookprokash.com/order/singleOrder/${orderId}`
    );
    const order = await response.json();

    return {
      props: {
        order,
      },
      revalidate: 120, // Re-generate the page every 2 minutes (120 seconds)
    };
  } catch (error) {
    console.error("Error fetching order:", error);

    return {
      props: {
        order: {},
      },
      revalidate: 120, // Re-generate the page every 2 minutes (120 seconds)
    };
  }
}

export default OrderPage;
