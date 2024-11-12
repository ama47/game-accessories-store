import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

export default function Product(prop) {
  const product = prop.product;

  return (
    <Link to={`${product.productId}`}>
      <div className="bg-white overflow-hidden cursor-pointer hover:shadow-lg transition-all relative">
        <div className="w-full h-[250px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 p-2">
          <img
            src={product.productImage}
            alt={product.productName}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="p-6">
          <hr className="border-2 mb-6" />
          <div>
            <h3 className="text-base text-gray-800">{product.productName}</h3>

            <h4 className="text-xl text-gray-800 font-bold mt-4">
              ${product.productPrice}
            </h4>
          </div>

          <div className="flex space-x-1.5 mt-4">
            <Rating
              sx={{ margin: "auto" }}
              name="read-only"
              value={product.averageRating}
              precision={0.5}
              readOnly
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
