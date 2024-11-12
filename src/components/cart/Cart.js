import React, { useState } from "react";
import CartItem from "./CartItem";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

export default function Cart(prop) {
  const {
    cart,
    setCart,
    cartCount,
    userData,
    setSnackBarMessage,
    setOpenErrorSnackBar,
  } = prop;
  const [totalPrice, setTotalPrice] = useState(calculateTotalPrice(cart));

  function calculateTotalPrice(currCart) {
    return currCart.reduce(
      (acc, curr) => acc + curr.product.productPrice * curr.quantity,
      0
    );
  }

  const navigate = useNavigate();
  function handleClick() {
    if (userData) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="font-[sans-serif] bg-gradient-to-tr from-gray-200 via-gray-100 to-gray-50">
      <div className="max-w-7xl max-lg:max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-extrabold text-gray-800">
          Your shopping cart
        </h2>
        {cart.length !== 0 ? (
          <div className="grid lg:grid-cols-3 gap-4 relative mt-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((cartItem, i) => (
                <CartItem
                  cartItem={cartItem}
                  cart={cart}
                  setCart={setCart}
                  key={i}
                  setTotalPrice={setTotalPrice}
                  calculateTotalPrice={calculateTotalPrice}
                  setSnackBarMessage={setSnackBarMessage}
                  setOpenErrorSnackBar={setOpenErrorSnackBar}
                />
              ))}
            </div>

            <div className="bg-white h-max rounded-md p-6 shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] sticky top-0">
              <h3 className="text-xl font-bold text-gray-800">Order Summary</h3>

              <ul className="text-gray-800 text-sm divide-y mt-4">
                <li className="flex flex-wrap gap-4 py-3 font-bold">
                  Total{" "}
                  <span className="ml-auto">${totalPrice.toFixed(2)}</span>
                </li>
              </ul>

              <button
                type="button"
                className="mt-4 text-sm px-6 py-3 w-full bg-pink-600 hover:bg-pink-700 text-white rounded-md"
                onClick={() => handleClick()}
              >
                Make Payment
              </button>
            </div>
          </div>
        ) : (
          <div className="my-10">
            <p className="text-lg font-bold mb-5">Your cart is empty!</p>
            <Link to="/products">
              <Button variant="contained">to products</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
