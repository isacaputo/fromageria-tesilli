import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AddressForm from "../components/AddressForm";
import Review from "../components/Review";
import { useState } from "react";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Fomageria Tesilli
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Dados do Cliente", "Revise e Finalize o Pedido"];

export const Checkout = ({ cart }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [orderNumber, setOrderNumber] = useState(0);
  const [orderDetails, setOrderDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [orderId, setOrderId] = useState();
  const [loading, setLoading] = useState(false);

  const saveOrder = async (cart, orderDetails) => {
    try {
      const response = await fetch(`/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart.map(({ id, size, quantity }) => {
            return {
              id,
              size,
              quantity,
            };
          }),
          clientName: `${orderDetails.firstName} ${orderDetails.lastName}`,
          clientEmail: orderDetails.email,
          clientPhone: orderDetails.phone,
          clientAddress: `${orderDetails.address}, ${orderDetails.city}, ${orderDetails.state}, ${orderDetails.zip}`,
        }),
      });
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      // set error
      // set loading
    }
  };

  const handleNext = () => {
    if (activeStep === 1) {
      setLoading(true);

      saveOrder(cart, orderDetails)
        .then((data) => {
          setLoading(false);
          setOrderId(data.orderId);
        })
        .catch((err) => {
          setLoading(false);
          // set error message
        });

      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleDataChange = (entry) => {
    setOrderDetails(() => {
      return {
        ...orderDetails,
        [entry.name]: entry.value,
      };
    });
  };

  const isValidAddress = () => {
    const objectValues = Object.values(orderDetails);
    return objectValues.every((input) => input !== "");
  };

  return (
    <>
      <AppBar
        position="absolute"
        color="default"
        elevation={1}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Detalhes do Pedido
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        {cart.length === 0 ? (
          <div>seu carrinho está vazio</div>
        ) : (
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Agradecemos o seu pedido!
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #{orderId}. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </>
            ) : (
              <>
                {activeStep === 0 && (
                  <AddressForm
                    value={orderDetails}
                    onChange={handleDataChange}
                  />
                )}
                {activeStep === 1 && (
                  <Review address={orderDetails} cart={cart} />
                )}
                {activeStep !== steps.length && (
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Voltar
                      </Button>
                    )}
                    <LoadingButton
                      variant="contained"
                      onClick={() => handleNext(cart)}
                      sx={{ mt: 3, ml: 1 }}
                      disabled={!isValidAddress()}
                      loading={loading}
                    >
                      {activeStep === steps.length - 1
                        ? "Finalizar Pedido"
                        : "Continuar"}
                    </LoadingButton>
                  </Box>
                )}
              </>
            )}
          </Paper>
        )}
        <Copyright />
      </Container>
    </>
  );
};
