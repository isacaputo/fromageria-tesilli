import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import { Checkout } from "../pages/Checkout";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export function Layout({
  cart,
  showCart,
  onCloseCart,
  onDeleteItem,
  onUpdateQuantity,
  setShowCart,
}) {
  const [productSelected, setProductSelected] = useState();
  const navigate = useNavigate();
  console.log(cart);

  const subtotal = cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  const handleClick = () => {
    navigate(`/checkout`);
    onCloseCart();
  };

  const renderList = () => {
    console.log("render list");

    return (
      <Box sx={{ width: 650, padding: 4 }} role="presentation">
        <List>
          {cart.map((product, index) => (
            <div key={index}>
              <br />
              <Grid item xs={12} md={6}>
                <CardActionArea component="a" href="#">
                  <Card
                    sx={{ display: "flex", maxWidth: 1000, maxHeight: 180 }}
                  >
                    <CardContent sx={{ flex: 1 }}>
                      <Typography component="h2" variant="h5">
                        {product.name}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        {product.description}
                      </Typography>
                      <Typography variant="subtitle1" paragraph>
                        {product.size === 1 ? "Inteiro" : "Metade"}
                      </Typography>
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
                          onChange={(e) =>
                            onUpdateQuantity(index, e.target.value)
                          }
                          variant="filled"
                        />
                        <Button
                          onClick={() => onDeleteItem(index)}
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </Button>
                      </Box>
                    </CardContent>

                    <CardMedia
                      component="img"
                      sx={{ width: 200, display: { xs: "none", sm: "block" } }}
                      image={product.image}
                      alt={product.name}
                    />
                  </Card>
                </CardActionArea>
              </Grid>
            </div>
          ))}
        </List>
        <List>
          <div>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" color="text.secondary">
                Subtotal
              </Typography>
              <Typography variant="h5" color="text.secondary">
                {`R$ ${subtotal}`}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Frete a combinar
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Total
              </Typography>
              <Typography variant="h5" color="text.secondary">
                {`R$ ${subtotal}`}
              </Typography>
            </Grid>
          </div>
          <div>
            <Button onClick={handleClick} variant="contained">
              SEGUIR PARA CHECKOUT
            </Button>
          </div>
        </List>
      </Box>
    );
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </nav>

      <Outlet />

      <div>
        {
          <Drawer
            sx={{ width: "100%" }}
            anchor={"right"}
            open={showCart}
            onClose={onCloseCart}
          >
            {renderList()}
          </Drawer>
        }
      </div>
    </div>
  );

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

      <section className="cart">
        <div>-----------</div>
        <div>MEU CARRINHO</div>
        {/* <div>{<Cart />}</div> */}
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
                    onChange={(e) => onUpdateQuantity(index, e.target.value)}
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
        <div>
          <div>
            <p>SUBTOTAL</p>
            <p>{`R$ ${subtotal}`}</p>
            <p>FRETE A CALCULAR NO CHECKOUT</p>
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
      </section>
    </div>
  );
}
