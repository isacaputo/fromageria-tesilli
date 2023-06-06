import React, { useEffect } from 'react'
import  AppBar from '@mui/material/AppBar'
import  Toolbar  from '@mui/material/Toolbar'
import { Typography } from '@mui/material'
import { Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import { useState } from 'react'
import List from "@mui/material/List"
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon'
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box'
import axios from 'axios'


export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, [])

  const getOrders = async () => {
    try {
     const response = await axios.get("/api/orders", {
        headers: { 
          authorization: "Bearer " + localStorage.getItem("token"), 
        }
      });
      const data = response.data;
      setOrders(data);
    } catch(err) {
      console.log(err);
    }
  }

  const navigate = useNavigate();
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
           ORDERS
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
            <Link
            variant="button"
            color="neutral.contrastText"
            sx={{ my: 1, mx: 1.5 }}
            href="#"
            onClick={() => navigate("/editproducts")}>
              Edit Products
            </Link>

          </nav>

      </Toolbar>

    </AppBar>

    <Container
    sx={{
      mt:10
      }}>
      
      <List>
      {orders.map((order) => (
        <React.Fragment key={order.id}>
        <ListItem>
          <ListItemText> Order No #{order.id} Date: {order.date}
          <ListItemText>
          Email: {order.client_email}, Tel: {order.client_phone}, 
          </ListItemText>
          <ListItemText>
          {order.client_address}
          </ListItemText>
          <ul>
            {order.Products.map((product) => (
              <li key={product.id}>
                 {product.OrderHasProduct.quantity} X {product.OrderHasProduct.size} {product.product_name}
              </li>
            ))}
          </ul>
          <ListItemText>
            Order total: R$ {order.total_amount},00
          </ListItemText>
          </ListItemText>
          <ListItemIcon>
            <Checkbox/>
          </ListItemIcon>
        </ListItem>
        <Box sx={{ width: '100%' }}>
                <Divider />
              </Box>
        </React.Fragment>
      ))}
      </List>
    </Container>
    
    
    
    </>
  )
}
