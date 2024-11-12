import React from "react";
import WishListItem from "./WishListItem";
import { Box } from "@mui/material";

export default function WishList(prop) {
  let { wishList } = prop;
  wishList = JSON.parse(localStorage.getItem("wishList"));

  if (wishList === null || wishList === "") {
    return (
      <div>
        <p>Your wish list is empty!</p>
      </div>
    );
  }
  return (
    <div className="p-10">
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {wishList.map((wishListItem, i) => (
          <WishListItem wishListItem={wishListItem} key={i} />
        ))}
      </Box>
    </div>
  );
}
