import { useState, useEffect } from "react";
import RootLayout from "@/components/layouts/RootLayout";
import { useRouter } from "next/router";

const Checkout = () => {
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch the cart data from local storage on component mount
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    const order = {
      products: cart,
      shippingInfo,
    };
    console.log(order);
    try {
      const response = await fetch("http://test.notebookprokash.com/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        // Order submitted successfully, you can redirect to a confirmation page or handle as needed
        alert("Order submitted successfully");
        // Optionally, clear the cart after submitting the order
        setCart([]);
        localStorage.removeItem("cart");
        const formData = {
          cus_name: "mohid",
          cus_email: "mohid@gmail.com",
          cus_phone: "004787",
          amount: 500,
          currency: "BDT",
          desc: "This is description",
        };

        try {
          const response = await fetch(
            "http://test.notebookprokash.com/payment/payment",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          await console.log(data);
          if (data.result == "true") {
            // window.location.href = data.payment_url;
            alert("ok");
          } else {
            let errorMessage = "";
            for (const key in data) {
              errorMessage += data[key] + ". ";
            }
          }
        } catch (error) {
          console.error("Error:", error);
          // Handle the error, maybe display an error message to the user
        }
      } else {
        console.error("Failed to submit order:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };
  return (
    <div className="max-w-3xl mx-auto my-8 pt-24">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>

      {/* Display the list of items in the cart */}
      <div className="mb-4">
        {/* Loop through your cart items and display them */}
        {/* ... */}
      </div>

      {/* Shipping Information Form */}
      <form>
        <h2 className="text-xl font-bold mb-2">Shipping Information</h2>

        <div className="mb-4">
          <label htmlFor="fullName" className="block text-gray-700 font-bold">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={shippingInfo.fullName}
            onChange={handleInputChange}
            className="form-input mt-1 block w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-700 font-bold">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={shippingInfo.address}
            onChange={handleInputChange}
            className="form-input mt-1 block w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700 font-bold">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={shippingInfo.city}
            onChange={handleInputChange}
            className="form-input mt-1 block w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="postalCode" className="block text-gray-700 font-bold">
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={shippingInfo.postalCode}
            onChange={handleInputChange}
            className="form-input mt-1 block w-full"
            required
          />
        </div>

        <button
          type="button"
          onClick={handlePlaceOrder}
          className="bg-primary text-white px-4 py-2 rounded-full"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

Checkout.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default Checkout;
