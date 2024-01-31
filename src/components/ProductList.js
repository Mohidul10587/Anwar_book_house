// components/ProductList.js

import { useState, useEffect } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from your server when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products"); // Update the URL with your actual endpoint
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products); // Assuming the response structure has a 'products' property
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - {product.description} - $
            {product.price}
            {product.image && (
              <img
                src={`http://localhost:3000/uploads/${product.image}`}
                alt={product.name}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
