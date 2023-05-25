import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export const ProductList = () => {
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
          <div className="product-grid" key={product.id}>
            <ProductCard
              name={product.product_name}
              description={product.product_description}
              id={product.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
