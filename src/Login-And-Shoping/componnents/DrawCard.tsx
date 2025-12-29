import React from "react";
import { Product } from "../types/types";
import { Box, Button, Card, CardMedia, Typography } from "@mui/material";
import "../style.css";
import { useContextInformation } from "../hooks/Context";

interface DrawCardProps {
  product: Product;
}

const DrawCard: React.FC<DrawCardProps> = ({ product }) => {
    const {addProductToUserCart} = useContextInformation();
    
  return (
    <Card className="productCard" sx={{
        width:400,
        height:550,
        display:"flex",
        flexDirection:"column",
        overflow:"hidden",
    }}>

      <CardMedia
        component="img"
        image={product.image}
        alt="product image"
        sx={{
          height: 250,
          width: "100%",
          objectFit: "contain",
          flexShrink:0,
        }}
      />
      <Box
        sx={{
          padding: 2,
          overflowY: "auto",
          flexGrow: 1,
        }}
      >
        <Typography variant="h6" component="h3" noWrap>
          {product.title}
        </Typography>

        <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: "bold" }}>
          {product.price}$
        </Typography>

        <Typography variant="subtitle2" sx={{ mt: 1 }}>
          Description
        </Typography>

        <Typography variant="body2" sx={{ mt: 0.5, whiteSpace: "pre-wrap" }}>
          {product.description}
        </Typography>
      </Box>
      <Button fullWidth variant="contained" onClick={()=> addProductToUserCart(product)}>Add To Cart</Button>
    </Card>
  );
};

export default DrawCard;