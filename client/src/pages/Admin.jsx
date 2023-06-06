import React from "react";
import { TextField } from "@mui/material";
import Login from "../components/Login";
import { useState } from "react";
import { useNavigate } from "react-router"
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import axios from "axios";





 export default function Admin() {
  const [newProductInput, setNewProductInput] = useState({
    product_name: "",
    product_description: "",
    product_half_price: "",
    product_whole_price: "",
    product_half_weight: "",
    product_whole_weight: "",
    product_pairing: "",
    product_slogan: "",
    product_category:"",
    product_main_image:"",
    product_extra_image:"",
  });
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setNewProductInput((state) => ({
      ...state, 
      [name]: value,
    }));

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewProduct(newProductInput);

    setNewProductInput({
    product_name: "",
    product_description: "",
    product_half_price: "",
    product_whole_price: "",
    product_half_weight: "",
    product_whole_weight: "",
    product_pairing: "",
    product_slogan: "",
    product_category:"",
    product_main_image:"",
    product_extra_image:"",
    })
  }

  

  const addNewProduct = async (newProductInput) => {
    try {
      await axios.post("/api/products", newProductInput, {
        headers: { 
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"), 
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <AppBar>
      <Toolbar sx={{ flexWrap: "wrap" }}>
      <Typography
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, fontSize: 15, letterSpacing: 1 }}
          >
            <Link href="#"
              onClick={() => navigate("/")} color="inherit" underline="none">
            
            FROMAGERIA TESILLI
            </Link>
          </Typography>

          <Typography
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, fontSize: 15, letterSpacing: 1 }}
          >
           ADMIN VIEW 
          </Typography>

          <nav>
            <Link
            variant="button"
            color="neutral.contrastText"
            sx={{ my: 1, mx: 1.5 }}
            href="#"
            onClick={() => navigate("/")}
            >
              Back to Shop
            </Link>
          </nav>

      </Toolbar>
    </AppBar>
    <div>

<Container
sx={{
mt:10
}}>
<Login>

</Login>

</Container>
     
      
      <Container
      maxWidth="sm"
      sx={{
        border: '1px solid #000',
        borderRadius: '4px',
        padding: '16px',
        mt: 10, 
        mb: 4
      }}>
        <h4>Add a New Product</h4>
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <TextField
      required
      id="product_name"
      name="product_name"
      label="Product Name"
      variant="standard"
      value={newProductInput.product_name}
      onChange={handleFormChange}
      >
      </TextField>

        </Grid>
    
      <Grid item xs={12}>
      <TextField
      required
      id="product_description"
      name="product_description"
      label="Product Description"
      variant="standard"
      sx={{ width: '435px' }}
      value={newProductInput.product_description}
      onChange={handleFormChange}>
       </TextField>
       </Grid>

       <Grid item xs={6}>
      <TextField
      required
      id="product_half_price"
      name="product_half_price"
      label="Product Half Price"
      variant="standard"
      value={newProductInput.product_half_price}
      onChange={handleFormChange}>
       </TextField>
       </Grid>

       <Grid item xs={6}>
      <TextField
      required
      id="product_whole_price"
      name="product_whole_price"
      label="Product Whole Price"
      variant="standard"
      value={newProductInput.product_whole_price}
      onChange={handleFormChange}>
       </TextField>
       </Grid>

       <Grid item xs={6}>
      <TextField
      required
      id="product_half_weight"
      name="product_half_weight"
      label="Product Half Weight"
      variant="standard"
      value={newProductInput.product_half_weight}
      onChange={handleFormChange}>
       </TextField>
       </Grid>

       <Grid item xs={6}>
      <TextField
      required
      id="product_whole_weight"
      name="product_whole_weight"
      label="Product Whole Weight"
      variant="standard"
      value={newProductInput.product_whole_weight}
      onChange={handleFormChange}
      >
       </TextField>
       </Grid>

       <Grid item xs={6}>
      <TextField
      required
      id="product_pairing"
      name="product_pairing"
      label="Product Pairing"
      variant="standard"
      value={newProductInput.product_pairing}
      onChange={handleFormChange}>
       </TextField>
       </Grid>

       <Grid item xs={6}>
      <TextField
      required
      id="product_slogan"
      name="product_slogan"
      label="Product Slogan"
      variant="standard"
      value={newProductInput.product_slogan}
      onChange={handleFormChange}
      >
       </TextField>
       </Grid>

       <Grid item xs={12}>
      <TextField
      required
      id="product_category"
      name="product_category"
      label="Product Category"
      variant="standard"
      value={newProductInput.product_category}
      onChange={handleFormChange}
      >
       </TextField>
       </Grid>

       <Grid item xs={6}>
      <TextField
      required
      id="product_main_image"
      name="product_main_image"
      label="Main Image URL"
      variant="standard"
      value={newProductInput.product_main_image}
      onChange={handleFormChange}>
       </TextField>
       </Grid>

       <Grid item xs={6}>
      <TextField
      required
      id="product_extra_image"
      name="product_extra_image"
      label="Extra Image URL"
      variant="standard"
      value={newProductInput.product_extra_image}
      onChange={handleFormChange}>
       </TextField>
       </Grid>

       <Grid item xs={8}>

       </Grid>

      <Grid item xs={4}>
       <Button variant="contained"
       onClick={handleSubmit}>
        Add Product
       </Button>
       </Grid>

       </Grid>
       </Container>

</div>
</>

       

       



       
      
      
      
  

  );

}

