import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CartItem(prop) {
  const {
    cartItem,
    cart,
    setCart,
    setTotalPrice,
    calculateTotalPrice,
    setSnackBarMessage,
    setOpenErrorSnackBar,
  } = prop;
  const [cartItemQuantity, setCartItemQuantity] = useState(cartItem.quantity);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(cart));
  }, [cart]);

  function handleQuantityIncrement(currProduct) {
    if (currProduct.sku !== currProduct.quantity) {
      currProduct.quantity++;
      setCartItemQuantity(cartItemQuantity + 1);
      const updatedCart = cart.map((item) =>
        item.product.productId === currProduct.product.productId
          ? { ...item, quantity: currProduct.quantity }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      setSnackBarMessage("Cannot increase the quantity, SKU is out of stock!");
      setOpenErrorSnackBar(true);
    }
  }

  function handleQuantityDecrement(currProduct) {
    if (cartItemQuantity > 1) {
      currProduct.quantity--;
      setCartItemQuantity(cartItemQuantity - 1);
      const updatedCart = cart.map((item) =>
        item.product.productId === currProduct.product.productId
          ? { ...item, quantity: currProduct.quantity }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedCart = cart.filter(
        (item) => item.productId !== currProduct.productId
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  }

  return (
    <div className="p-6 bg-white shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] rounded-md relative">
      <div className="flex items-center max-sm:flex-col gap-4 max-sm:gap-6">
        <div className="w-52 shrink-0">
          <img
            src={cartItem.product.productImage}
            alt={cartItem.product.productName}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="sm:border-l sm:pl-4 sm:border-gray-300 w-full">
          <Link to={`/products/${cartItem.productId}`}>
            <h3 className="text-xl font-bold text-gray-800">
              {cartItem.product.productName}
            </h3>
          </Link>
          <ul className="mt-4 text-sm text-gray-800 space-y-2">
            <li>{cartItem.product.description}</li>
          </ul>

          <hr className="border-gray-300 my-6" />

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <h4 className="text-sm font-bold text-gray-800">Qty:</h4>
              <button
                type="button"
                className="flex items-center justify-center w-5 h-5 bg-pink-600 outline-none rounded-full"
                onClick={() => {
                  handleQuantityDecrement(cartItem);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-2 fill-white"
                  viewBox="0 0 124 124"
                >
                  <path
                    d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                    data-original="#000000"
                  ></path>
                </svg>
              </button>
              <span className="font-bold text-sm leading-[16px]">
                {cartItemQuantity}
              </span>
              <button
                type="button"
                className="flex items-center justify-center w-5 h-5 bg-pink-600 outline-none rounded-full"
                onClick={() => {
                  handleQuantityIncrement(cartItem);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-2 fill-white"
                  viewBox="0 0 42 42"
                >
                  <path
                    d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                    data-original="#000000"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="flex items-center">
              <h4 className="text-lg font-bold text-gray-800">
                ${cartItem.product.productPrice}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
