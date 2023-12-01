import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function AddressForm({ value, onChange }) {
  // States declaration
  const [checked, setChecked] = useState([0]);

  // Handle toggle index function declaration
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  // Handle form change function declaration
  const handleFormChange = (e) => {
    const { value, name } = e.target;
    onChange({
      name,
      value,
    });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Preencha seus dados
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Nome"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={value.firstName}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Sobrenome"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={value.lastName}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="e-mail"
            name="email"
            label="E-mail"
            fullWidth
            autoComplete="email"
            variant="standard"
            value={value.email}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
            autoComplete="phone"
            variant="standard"
            value={value.phone}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Endereço de Entrega"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            value={value.address}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="Cidade"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            value={value.city}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="state"
            name="state"
            label="Estado"
            fullWidth
            variant="standard"
            value={value.state}
            onChange={handleFormChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Código Postal"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            value={value.zip}
            onChange={handleFormChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
