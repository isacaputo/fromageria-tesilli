import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { formatCurrency } from "../helper";

export default function Review({ cart, address }) {
  const subtotal = cart.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Produtos
      </Typography>
      <List disablePadding>
        {cart.map((product) => (
          <ListItem key={product.price} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ width: 180 }}
              primary={product.name.toUpperCase()}
              secondary={product.description}
            />
            <ListItemText primary={product.size === 1 ? "Inteiro" : "Metade"} />
            <ListItemText>Qtd. {product.quantity}</ListItemText>
            <ListItemText sx={{ textAlign: "right" }}>
              {formatCurrency(product.price * product.quantity)}
            </ListItemText>
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
            A combinar
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {formatCurrency(subtotal)}
          </Typography>
        </ListItem>
      </List>
      <hr />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Dados para Entrega
          </Typography>
          <Typography gutterBottom>
            {`${address.firstName} ${address.lastName}`}
          </Typography>
          <Typography gutterBottom>{address.email}</Typography>
          <Typography gutterBottom>{address.address}</Typography>
          <Typography gutterBottom>{address.city}</Typography>
          <Typography gutterBottom>{address.state}</Typography>
          <Typography gutterBottom>{address.zip}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
