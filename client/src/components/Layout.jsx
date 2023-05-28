import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";

export function Layout({ cart, onCartQuantity, setCart }) {
  const [qtd, setQtd] = useState(onCartQuantity);

  const handleDelete = (cartPosition) => {
    setCart(cart.filter((item, id) => item[id] !== cartPosition));
  };

  return (
    <div>
      <h1>FROMAGERIA TESILLI</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/checkout">Checkout</Link>
          </li>
        </ul>
      </nav>

      <Outlet />

      <section>
        <div>-----------</div>
        <div>MEU CARRINHO</div>
        <div>
          {cart.map((product, i) => (
            <div key={i}>
              <div>
                <img />
              </div>
              <div>{product.name.toUpperCase()}</div>
              <div>{product.description}</div>
              <div>
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
                    inputProps={{ min: 0 }}
                    value={qtd}
                    onChange={(e) => setQtd(e.target.value)}
                    variant="filled"
                  />
                </Box>
              </div>
              <div>
                <Button
                  onClick={(id) => handleDelete(id)}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                ></Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
