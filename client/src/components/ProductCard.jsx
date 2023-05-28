import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ name, description, id, image }) {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={"/public/images/cheese_pictures/juri/juri1.jpg"}
        title={`Image of cheese &{name}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name.toUpperCase()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small" onClick={() => handleClick(id)}>
          Detalhes
        </Button>
      </CardActions>
    </Card>
  );
}
