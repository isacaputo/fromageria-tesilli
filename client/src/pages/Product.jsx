import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const defaultSize = 1;
const defaultQuantity = 1;

export const Product = ({ onAddCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [size, setSize] = useState(defaultSize);
  const [quantity, setQuantity] = useState(defaultQuantity);
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetail(id);
  }, [id]);

  const getProductDetail = async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "GET",
      });
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    onAddCart({
      name: product.product_name,
      description: product.product_description,
      id: product.id,
      image: product.product_main_image,
      size: size,
      price:
        size === 1 ? product.product_whole_price : product.product_half_price,
      quantity,
    });
    setQuantity(defaultQuantity);
  };

  const handleSelection = (event) => {
    setSize(event.target.value);
  };

  const handleGoBack = () => {
    navigate(`/products`);
  };

  return (
    <div>
      <h4>{product.product_category}</h4>
      <h2>{product.product_name}</h2>
      <div>
        <img
          src={product.product_main_image}
          title={`Image of whole cheese ${product.product_name}`}
        />
      </div>
      <div>
        <img
          src={product.product_extra_image}
          title={`Image of half cheese ${product.product_name}`}
        />
      </div>
      <p>{product.product_description}</p>
      <p>{product.product_slogan}</p>
      <p>{product.product_pairing}</p>
      <p>{product.product_half_price}</p>
      <p>{product.product_whole_price}</p>
      <div>
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel id="demo-simple-select-helper-label">Tamanho</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={size}
            label="Tamanho"
            onChange={handleSelection}
          >
            <MenuItem value={0.5}>Metade (160 - 230g)</MenuItem>
            <MenuItem value={1}>Inteiro (320 - 460g)</MenuItem>
          </Select>
        </FormControl>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "10ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Qtd"
            type="number"
            inputProps={{ min: 1 }}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </Box>
      </div>
      <Button onClick={handleClick} variant="contained">
        Adicionar ao carrinho
      </Button>
      <div>
        <Button onClick={handleGoBack}>VOLTAR</Button>
      </div>
    </div>
  );
};
