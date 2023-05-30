import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

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
  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "80vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={10}
          component={Paper}
          elevation={6}
          square
          container={true}
        >
          <ImageList sx={{ width: 450, height: 725 }} cols={1} rowHeight={2}>
            <ImageListItem key={product.product_main_image}>
              <img
                src={product.product_main_image}
                alt={`Image of ${product.product_name}`}
                loading="lazy"
              />
            </ImageListItem>
            <ImageListItem key={product.product_extra_image}>
              <img
                src={product.product_extra_image}
                alt={`Image of ${product.product_name}`}
                loading="lazy"
              />
            </ImageListItem>
          </ImageList>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {product.product_name}
            </Typography>
            <Typography variant="h6" color="inherit" paragraph>
              {product.product_description}
            </Typography>
            <Typography
              variant="h7"
              color="inherit"
              paragraph
              sx={{ width: 450 }}
            >
              {product.product_slogan}
            </Typography>
            <br />
            <Card sx={{ maxWidth: 300 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Preço de Metade do Queijo
                </Typography>
                <Typography variant="h5" component="div"></Typography>
                <Typography variant="h5">
                  {`R$ ${product.product_half_price}`}
                </Typography>
                <br />
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Preço do Queijo Inteiro
                </Typography>
                <Typography variant="h5" component="div"></Typography>
                <Typography variant="h5">
                  {`R$ ${product.product_whole_price}`}
                </Typography>
              </CardContent>
            </Card>
            <br />
            <Box>
              <FormControl sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Tamanho
                </InputLabel>
                <Select
                  sx={{ maxWidth: 200 }}
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
              <br />
              <Button onClick={handleClick} variant="contained">
                Adicionar ao carrinho
              </Button>
              <Button onClick={handleGoBack}>VOLTAR</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
