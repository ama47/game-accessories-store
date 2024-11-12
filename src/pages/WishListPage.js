import React from "react";
import WishList from "../components/wishList/WishList";

export default function WishListPage(prop) {
  const { wishList, wishListCount, cartCount } = prop;

  return (
    <div>
      <WishList wishList={wishList} />
    </div>
  );
}
