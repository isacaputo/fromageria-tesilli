import { AppBar, Toolbar, Typography, Link, Container } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Login from '../components/Login';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

export default function Admin() {

  const auth = useContext(AuthContext);

  const navigate = useNavigate();
  return (
    <>
    <AppBar>

      <Toolbar sx={{ flexWrap: "wrap" }}>

        <Typography
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1, fontSize: 15, letterSpacing: 1 }}>

            <Link href="#"
              onClick={() => navigate("/")} color="inherit" underline="none">
            
            FROMAGERIA TESILLI
            </Link>

        </Typography>

        <Typography
         variant="h6"
         color="inherit"
         noWrap
         sx={{ flexGrow: 1, fontSize: 15, letterSpacing: 1 }}>

          ADMIN 

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

            {auth.user === true && 
            <Link
            variant="button"
            color="neutral.contrastText"
            sx={{ my: 1, mx: 1.5 }}
            href="#"
            onClick={() => navigate("/orders")}>
              View Orders
            </Link>
            }


            {auth.user === true && 
            <Link variant="button"
            color="neutral.contrastText"
            sx={{ my: 1, mx: 1.5 }}
            href="#"
            onClick={() => navigate("/editproducts")}>
            Edit products
            </Link>
            }

          </nav>
      </Toolbar>
    </AppBar>

<Container
maxWidth="sm"
sx={{
  border: '1px solid grey',
  borderRadius: '4px',
  padding: '16px',
  mt: 10, 
  mb: 4
}}>

<Login>

</Login>


</Container>



    
    </>
  )
}
