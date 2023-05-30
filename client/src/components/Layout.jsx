import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  Badge,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Toolbar,
  Link,
  Button,
  AppBar,
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../helper";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href={location.origin}>
        Fromageria Tesilli
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export function Layout({
  cart,
  showCart,
  onCloseCart,
  onDeleteItem,
  onUpdateQuantity,
  onOpenCart,
}) {
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  const handleClick = () => {
    navigate(`/checkout`);
    onCloseCart();
  };

  return (
    <>
      <AppBar position="static" elevation={0}>
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, fontSize: 15, letterSpacing: 1 }}
          >
            FROMAGERIA TESILLI
          </Typography>
          <nav>
            <Link
              variant="button"
              color="neutral.contrastText"
              sx={{ my: 1, mx: 1.5 }}
              href="#"
              onClick={() => navigate("/")}
            >
              Home
            </Link>
            <Link
              variant="button"
              color="neutral.contrastText"
              sx={{ my: 1, mx: 1.5 }}
              href="#"
              onClick={() => navigate("/products")}
            >
              Products
            </Link>
            <IconButton aria-label="carrinho" onClick={onOpenCart}>
              <Badge color="secondary" badgeContent={cart.length}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </nav>
        </Toolbar>
      </AppBar>
      <Drawer anchor={"right"} open={showCart} onClose={onCloseCart}>
        <Box sx={{ width: 650, padding: 2 }} role="presentation">
          <List disablePadding>
            {cart.map((product, index) => (
              <ListItem key={index} sx={{ pl: 0, pr: 0 }}>
                <Card
                  sx={{ display: "flex", maxHeight: 180, width: "100%" }}
                  variant="outlined"
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
                    <Box sx={{ display: "flex", gap: "6px" }}>
                      <TextField
                        label="Qtd"
                        type="number"
                        inputProps={{ min: 1 }}
                        size="small"
                        value={product.quantity}
                        sx={{ width: "70px" }}
                        onChange={(e) =>
                          onUpdateQuantity(index, e.target.value)
                        }
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
              </ListItem>
            ))}
            <hr />
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Subtotal" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {formatCurrency(subtotal)}
              </Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Frete" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {`a combinar`}
              </Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {formatCurrency(subtotal)}
              </Typography>
            </ListItem>
          </List>

          <br />
          <Button
            onClick={handleClick}
            variant="contained"
            disableElevation
            disabled={!cart.length}
          >
            SEGUIR PARA CHECKOUT
          </Button>
        </Box>
      </Drawer>

      <Outlet />
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Fromageria Tesilli
        </Typography>
        <Copyright />
      </Box>
    </>
  );
}
