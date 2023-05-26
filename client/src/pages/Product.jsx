import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";

export const Product = (props) => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getProductDetail(id);
  }, []);

  const getProductDetail = async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "GET",
      });
      const data = await response.json();
      setProduct(data);
      console.log(product);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h4>{product.product_category}</h4>
      <h2>{product.product_name}</h2>
      <p>{product.product_description}</p>
      <p>{product.product_slogan}</p>
      <p>{product.product_pairing}</p>
      <p>{product.product_half_price}</p>
      <p>{product.product_whole_price}</p>
      <Button variant="contained">Adicionar ao carrinho</Button>
    </div>
  );
};
