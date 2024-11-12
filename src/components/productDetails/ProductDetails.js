import React, { useEffect, useState } from "react";
import { LinearProgress, Rating } from "@mui/material";
import Error from "../error/Error";
import ProductDetailsCard from "./ProductDetailsCard";
import axios from "axios";
import ReviewForm from "../forms/ReviewForm";

export default function ProductDetails(prop) {
  const {
    product,
    loading,
    error,
    wishList,
    setWishList,
    setWishListCount,
    cart,
    setCart,
    setCartCount,
    userData,
    isAuthenticated,
    setSnackBarMessage,
    setOpenSuccessSnackBar,
    setOpenErrorSnackBar,
  } = prop;

  const [reviews, setReviews] = useState(false);
  const [reviewButton, setReviewButton] = useState(true);

  if (loading) {
    return (
      <div className="text-center my-10">
        <LinearProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Error errorMessage={"We couldn't find that product!"} errorCode={404} />
    );
  }

  return (
    <div className="font-sans bg-white">
      <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
        <ProductDetailsCard
          product={product}
          wishList={wishList}
          setWishList={setWishList}
          setWishListCount={setWishListCount}
          cart={cart}
          setCart={setCart}
          setCartCount={setCartCount}
          userData={userData}
          setSnackBarMessage={setSnackBarMessage}
          setOpenSuccessSnackBar={setOpenSuccessSnackBar}
          setOpenErrorSnackBar={setOpenErrorSnackBar}
        />

        <div className="mt-16 shadow-md shadow-pink-500/30 p-6">
          <h3 className="mb-5 text-xl font-bold text-gray-800">
            Product information
          </h3>
          <p>{product.description}</p>
        </div>

        <div className="mt-16 shadow-md shadow-pink-500/30 p-6">
          <h3 className="text-xl font-bold text-gray-800">Reviews</h3>
          <div className="grid md:grid-cols-2 gap-12 mt-4">
            <div className="space-y-3">
              {isAuthenticated ? (
                <ReviewForm
                  isAuthenticated={isAuthenticated}
                  userId={userData.userId}
                  productId={product.productId}
                  setSnackBarMessage={setSnackBarMessage}
                  setOpenSuccessSnackBar={setOpenSuccessSnackBar}
                  setOpenErrorSnackBar={setOpenErrorSnackBar}
                />
              ) : (
                <p>You must log in order to write review.</p>
              )}
            </div>
            <div>
              {reviewButton ? (
                <button
                  type="button"
                  className="w-full mt-10 px-4 py-2.5 bg-transparent hover:bg-gray-50 border border-pink-600 text-gray-800 font-bold rounded"
                  onClick={() => {
                    setReviews(true);
                    setReviewButton(false);
                  }}
                >
                  Read all reviews
                </button>
              ) : (
                <></>
              )}

              {reviews ? (
                <Reviews
                  product={product}
                  setSnackBarMessage={setSnackBarMessage}
                  setOpenSuccessSnackBar={setOpenSuccessSnackBar}
                  setOpenErrorSnackBar={setOpenErrorSnackBar}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Reviews = (prop) => {
  const {
    product,
    setSnackBarMessage,
    setOpenSuccessSnackBar,
    setOpenErrorSnackBar,
  } = prop;
  const [reviewsList, setReviewsList] = useState([]);

  useEffect(() => {
    function getReviews() {
      axios
        .get(
          `https://game-accessories-api.onrender.com/api/v1/Reviews/product/${product.productId}`
        )
        .then((response) => {
          setReviewsList(response.data);
        })
        .catch((error) => {
          setSnackBarMessage("An error occurred while  fetching data");
          setOpenErrorSnackBar(true);
        });
    }
    getReviews();
  }, []);

  return (
    <div className="flex items-start mb-5">
      {reviewsList.map((review, i) => (
        <SingleReview review={review} key={i} />
      ))}
    </div>
  );
};

const SingleReview = (prop) => {
  const { review } = prop;
  const [username, setUsername] = useState("");

  useEffect(() => {
    function getUsername() {
      axios
        .get(
          `https://game-accessories-api.onrender.com/api/v1/Users/username/${review.userId}`
        )
        .then((response) => {
          setUsername(response.data.username);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    getUsername();
  }, []);

  return (
    <div class="ml-3">
      <h4 class="text-sm font-bold text-gray-800">
        {username ? username : "Deleted User"}
      </h4>
      <div class="flex space-x-1 mt-1 justify-center">
        <Rating name="read-only" value={review.rating} readOnly />
      </div>
      <p class="text-sm mt-4 text-gray-800">{review.comment}</p>
    </div>
  );
};
