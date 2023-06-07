import {React, useEffect, useState} from 'react'
import Select from 'react-select'
import { Container, Grid, Typography, Button, Box } from '@mui/material'
import axios from 'axios';



export default function RemoveProduct() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

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

  const handleProductChange = (selectedOption) => {
    setSelectedProduct(selectedOption);
  }

  const customStyles = {
    control: (provided) => ({
      ...provided,
      color: '#000', // Set the text color to black
    }),
  };

  const handleDelete = (selectedProductId) => {
    deleteProduct(selectedProductId);
    setSelectedProduct("");
    setSelectedOption("");

  }

  const deleteProduct = async (selectedProductId) => {
    try {
      const response = await axios.delete(`/api/products/${selectedProductId}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"), 
        }
      });
      if (response.status === 200) {
        console.log('Product deleted successfully');
        getProducts();
        setDeleteSuccess(true);
      } else {
        console.log('Failed to delete product')
      }
    } catch (err) {
      console.log(err);
    }
  }

  


return (
    <>
<Container
maxWidth="md"
sx={{
  borderRadius: '4px',
  padding: '16px',
  mt: 8, 
  mb: 4
}}>

  <Grid container spacing={2}>

    <Grid item xs={12}>
      <Box textAlign="center">
      <Typography variant='h6'>
        Select the product you wish to delete
      </Typography>
      </Box>

    </Grid>

  <Grid item xs={2}>
  </Grid>

    <Grid item xs={8}>
    <Select
    options={products.map((product) => ({
      value: product.id,
      label: product.product_name
    }))}
    value={selectedProduct}
    onChange={handleProductChange}
    styles={customStyles}
    >
    </Select>
 
    </Grid>

    <Grid item xs={2}>
  </Grid>
   

    <Grid item xs={12}>
      <Box textAlign="center">
    <Button
    variant='contained'
    onClick={() => handleDelete(selectedProduct?.value)}>
      Delete Product
    </Button>
    </Box>
    </Grid>

    {deleteSuccess === true && 
    <Grid item xs={12}>
      <Box textAlign="center">
      <Typography>
        Product Deleted Successfully
        <Button onClick={() => setDeleteSuccess(false)}>
        ok
      </Button>
      </Typography>
      </Box>
  

    </Grid> }

    
  </Grid>
    </Container>
    </>
  )
}
