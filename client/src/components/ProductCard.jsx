import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { CardActionArea, Box } from "@mui/material";
import { formatCurrency } from "../helper";

export default function ProductCard({ name, id, description, image, price }) {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <Card>
      <CardActionArea onClick={() => handleClick(id)}>
        <CardMedia
          sx={{ height: 210 }}
          image={image}
          title={`Image of cheese ${name}`}
        />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "4px",
            }}
          >
            <Typography variant="h6" component="div">
              {name}
            </Typography>
            <Typography>
              <strong>{formatCurrency(price)}</strong>
            </Typography>
          </Box>
          <Typography variant="p" color="text.secondary" fontSize={14}>
            {description}
          </Typography>
        </CardContent>
        {/* <CardActions>
        <Button size="small" onClick={() => handleClick(id)}>
        Detalhes
        </Button>
      </CardActions> */}
      </CardActionArea>
    </Card>
  );
}
