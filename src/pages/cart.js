// pages/cart.js
import RootLayout from "@/components/layouts/RootLayout";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  RiArrowDropRightLine,
  RiArrowDropLeftLine,
  RiDeleteBin6Line,
} from "react-icons/ri";

const Cart = ({ cartProductQuantity, setCartProductQuantity }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch the cart data from local storage on component mount
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateQuantity = (productId, newQuantity) => {
    // Ensure that the new quantity is at least 1
    newQuantity = Math.max(1, newQuantity);

    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );

    setCart(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const deleteProduct = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const updateLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
    <div className="max-w-3xl mx-auto my-8 min-h-screen pt-24">
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>

      <div className="flex justify-between">
        <div>
          {cart.map((item) => (
            <div key={item.id} className="border rounded p-4 mb-4 flex gap-4">
              <Image
                className="border border-black h-44 w-44"
                src={`http://test.notebookprokash.com/uploads/${item.image}`}
                width={150}
                height={150}
              />
              <div>
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-gray-600">Price: ${item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => {
                      updateQuantity(item.id, item.quantity - 1);
                      setCartProductQuantity(cartProductQuantity - 1);
                    }}
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-full mr-2"
                  >
                    <RiArrowDropLeftLine />
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => {
                      updateQuantity(item.id, item.quantity + 1);
                      setCartProductQuantity(cartProductQuantity + 1);
                    }}
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-full ml-2"
                  >
                    <RiArrowDropRightLine />
                  </button>
                </div>
                <p className="mt-2">Subtotal: ${item.quantity * item.price}</p>
                <button
                  onClick={() => {
                    deleteProduct(item.id);
                    setCartProductQuantity(0);
                  }}
                  className="text-red-500 hover:text-red-700 mt-2 cursor-pointer"
                >
                  <RiDeleteBin6Line /> Remove from Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="">
          <h2 className="text-2xl font-bold mb-2">Cart Summary</h2>
          <p className="font-semibold">Total: ${calculateTotal()}</p>
          <Link href="/checkout"> Checkout</Link>
        </div>
      </div>
    </div>
  );
};

Cart.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default Cart;
