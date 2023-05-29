import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import { Checkout } from "../pages/Checkout";
import { useNavigate } from "react-router-dom";
import Cart from "../components/Cart";

export function Layout({ cart, onDeleteItem, onUpdateQuantity }) {
  const [quantitySelected, setQuantitySelected] = useState();
  const [productSelected, setProductSelected] = useState();
  const [subTotal, setSubTotal] = useState();

  const subtotal = cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/checkout`);
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
        <div>{<Cart />}</div>
        <div>
          {cart.map((product, index) => (
            <div key={index}>
              <div>
                <img />
              </div>
              <div>{product.name.toUpperCase()}</div>
              <div>{product.description}</div>
              <div>{product.size === 1 ? "INTEIRO" : "METADE"}</div>
              <div>{`R$ ${product.price}`}</div>
              <div>
                <img src={product.image} title="" />
              </div>
              <div>
                {/* / <img title="" /> form to choose quantity */}
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
                    value={product.quantity}
                    // onChange={(e) => setQuantitySelected(e.target.value)}
                    variant="filled"
                  />
                </Box>
              </div>
              <div>
                {/* / <img title="" /> delete from cart button */}
                <Button
                  onClick={() => onDeleteItem(index)}
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div>
        <div>
          <p>SUBTOTAL</p>
          <p>{`R$ ${subtotal}`}</p>
          <p>FRETE</p>
          <p>A CALCULAR NO CHECKOUT</p>
          <p>TOTAL</p>
          <p>{`R$ ${subtotal}`}</p>
          <p></p>
        </div>
      </div>
      <div>
        <Button onClick={handleClick} variant="contained">
          SEGUIR PARA CHECKOUT
        </Button>
      </div>
    </div>
  );
}
