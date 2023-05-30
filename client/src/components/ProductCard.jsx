import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { CardActionArea } from "@mui/material";

export default function ProductCard({ name, id, description, image }) {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <Card sx={{ maxWidth: 500, maxHeight: 500 }}>
      <CardActionArea>
        <CardMedia
          sx={{ height: 150 }}
          image={image}
          title={`Image of cheese ${name}`}
          onClick={() => handleClick(id)}
        />
      </CardActionArea>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name.toUpperCase()}
        </Typography>
        <Typography variant="p" color="text.secondary" fontSize={14}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleClick(id)}>
          Detalhes
        </Button>
      </CardActions>
    </Card>
  );
}
