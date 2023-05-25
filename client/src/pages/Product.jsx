import React, { useEffect, useState } from "react";

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
            <h3>{product.product_name.toUpperCase()}</h3>
            <div>{product.product_description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
