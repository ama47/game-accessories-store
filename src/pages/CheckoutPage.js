import React from "react";
import Checkout from "../components/checkout/Checkout";

export default function CheckoutPage(prop) {
  const {
    setSnackBarMessage,
    setOpenSuccessSnackBar,
    setOpenErrorSnackBar,
    cart,
    setCart,
  } = prop;

  return (
    <div>
      <Checkout
        userData={prop.userData}
        setSnackBarMessage={setSnackBarMessage}
        setOpenSuccessSnackBar={setOpenSuccessSnackBar}
        setOpenErrorSnackBar={setOpenErrorSnackBar}
        cart={cart}
        setCart={setCart}
      />
    </div>
  );
}
