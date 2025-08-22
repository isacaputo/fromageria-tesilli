import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { api } from '../config/api';

export const ProductList = ({ onAddCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('Failed to load products. Please try again later.');
      setProducts([]); // Ensure products is always an array
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
        }}
      >
        <Container sx={{ justifyContent: 'center' }} maxWidth="md">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ fontFamily: 'Oooh Baby', fontSize: 80 }}
          >
            Fromageria Tesilli
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
            sx={{ justifyContent: 'center' }}
          >
            Produzimos <strong>queijos artesanais maturados</strong>{' '}
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
        {loading && (
          <Typography align="center" variant="h6">
            Loading products...
          </Typography>
        )}
        {error && (
          <Typography align="center" variant="h6" color="error">
            {error}
          </Typography>
        )}
        {!loading && !error && (
          <Grid container spacing={4}>
            {Array.isArray(products) &&
              products.map((product) => (
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
            {Array.isArray(products) && products.length === 0 && (
              <Grid item xs={12}>
                <Typography align="center" variant="h6">
                  No products available.
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Container>
    </main>
  );
};
