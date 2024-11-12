import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";

export default function ProductDetailsCard(prop) {
  const {
    product,
    wishList,
    setWishList,
    setWishListCount,
    cart,
    setCart,
    setCartCount,
    userData,
  } = prop;

  function handleAddToWishList(product) {
    const isInclude = wishList.some(
      (item) => item.productId === product.productId
    );
    if (!isInclude) {
      localStorage.setItem("wishList", JSON.stringify([...wishList, product]));
      setWishList([...wishList, product]);
      setWishListCount(wishList.length + 1);
    }
  }

  function handleAddToCart(currProduct) {
    const existingItem = cart.find(
      (item) => item.product.productId === currProduct.productId
    );

    const updatedCart = existingItem
      ? cart.map((item) =>
          item.product.productId === currProduct.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [
          ...cart,
          {
            product: currProduct,
            productId: currProduct.productId,
            quantity: 1,
            sku: currProduct.sku,
          },
        ];

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    setCartCount(updatedCart.length);
  }
  const navigate = useNavigate();
  function handleBuyNow(currProduct) {
    setCart([{ productId: currProduct.productId, quantity: 1 }]);
    localStorage.setItem(
      "cart",
      JSON.stringify([{ productId: currProduct.productId, quantity: 1 }])
    );
    navigate("/checkout");
  }

  return (
    <div>
      <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-md shadow-pink-500/30 p-6 rounded-lg">
        <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
          <div className="px-4 py-10 rounded-lg shadow-md shadow-pink-500/30 relative">
            <img
              src={product.productImage}
              alt={product.productName}
              className="w-1/2 rounded object-cover mx-auto"
            />
            <button type="button" className="absolute top-4 right-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                fill="#ccc"
                className="mr-1 hover:fill-[#333]"
                viewBox="0 0 64 64"
              >
                <path
                  d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                  data-original="#000000"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-2xl font-extrabold text-gray-800">
            {product.productName}
          </h2>

          <div className="flex space-x-2 mt-4">
            <Rating
              name="read-only"
              value={product.averageRating}
              precision={0.5}
              readOnly
            />
            {/* <h4 className="text-gray-800 text-base">500 Reviews</h4>*/}
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <p className="text-gray-800 text-3xl font-bold">
              ${product.productPrice}
            </p>
            <p className="text-gray-400 text-base">
              <span className="text-sm ml-1">Tax included</span>
            </p>
          </div>
          {/*
              <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-800">Choose a Color</h3>
                  <div className="flex flex-wrap gap-3 mt-4">
                      <button type="button" className="w-10 h-10 bg-black border-2 border-white hover:border-gray-800 rounded-full shrink-0 transition-all"></button>
                      <button type="button" className="w-10 h-10 bg-gray-300 border-2 border-white hover:border-gray-800 rounded-full shrink-0 transition-all"></button>
                      <button type="button" className="w-10 h-10 bg-gray-100 border-2 border-white hover:border-gray-800 rounded-full shrink-0 transition-all"></button>
                      <button type="button" className="w-10 h-10 bg-pink-400 border-2 border-white hover:border-gray-800 rounded-full shrink-0 transition-all"></button>
                  </div>
              </div>*/}

          <div className="flex flex-wrap gap-4 mt-8">
            {product.sku !== 0 ? (
              <>
                <button
                  type="button"
                  className="min-w-[200px] px-4 py-3 bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold rounded"
                  onClick={() => handleBuyNow(product)}
                >
                  Buy now
                </button>
                <button
                  type="button"
                  className="min-w-[200px] px-4 py-2.5 border border-pink-600 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to cart
                </button>
                {product.sku <= 10 ? (
                  <div>
                    <p className="text-red-500 font-bold">
                      Only {product.sku} in stock, order it now!
                    </p>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                <p className="text-red-500 font-bold">Out of stock!</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
