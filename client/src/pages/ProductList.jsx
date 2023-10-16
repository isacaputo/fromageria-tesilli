import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export const ProductList = ({ onAddCart }) => {
  // States declaration
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  // Get products list function declaration
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
    <main>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
        }}
      >
        <Container sx={{ justifyContent: "center" }} maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ fontFamily: "Oooh Baby", fontSize: 80 }}
          >
            Fromageria Tesilli
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
            sx={{ justifyContent: "center" }}
          >
            Produzimos <strong>queijos artesanais maturados</strong>{" "}
            cuidadosamente elaborados, combinando ingredientes deliciosos com
            pinceladas de criatividade.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          ></Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard
                price={product.product_whole_price}
                name={product.product_name}
                id={product.id}
                description={product.product_description}
                image={product.product_main_image}
                onAddCart={onAddCart}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
};
