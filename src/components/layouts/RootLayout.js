// RootLayout.js
import { cloneElement, useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";

const RootLayout = ({ children }) => {
  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("cart"));
    const totalQuantity = products?.reduce(
      (total, product) => total + product.quantity,
      0
    );
    setCartProductQuantity(totalQuantity);
  });
  const [genre, setGenre] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartProductQuantity, setCartProductQuantity] = useState(0);

  return (
    <div>
      <Header
        props={{
          setGenre,
          setSearchQuery,
          searchQuery,
          cartProductQuantity,
        }}
      />
      <main>
        {cloneElement(children, {
          genre,
          setGenre,
          searchQuery,
          cartProductQuantity,
          setCartProductQuantity,
        })}
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
