import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

export default function WishListItem(prop) {
  const { wishListItem } = prop;

  return (
    <div className="my-5">
      <Card
        raised
        sx={{
          display: "block",
          width: "auto",
          transitionDuration: "0.3s",
          height: "70",
        }}
      >
        <CardMedia
          component="img"
          src={wishListItem.productImage}
          sx={{
            padding: "1em 1em 0 1em",
            objectFit: "contain",
            height: 200,
          }}
        />
        <Link to={`/products/${wishListItem.productId}`}>
          <CardHeader title={wishListItem.productName} />
        </Link>
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {wishListItem.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
