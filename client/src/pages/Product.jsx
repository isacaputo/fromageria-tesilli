import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch(`/api/products`, {
        method: "GET",
      });
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>PRODUTO</h1>
      <div>
        {products.map((product) => (
          <div className="product" key={product.product_id}>
            <ProductCard
              productName={product.product_name}
              productDescription={product.product}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
