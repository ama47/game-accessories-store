import {
  Button,
  FormControl,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

export default function ReviewForm(prop) {
  const {
    isAuthenticated,
    userId,
    productId,
    setSnackBarMessage,
    setOpenSuccessSnackBar,
    setOpenErrorSnackBar,
  } = prop;
  const [ratingValue, setRatingValue] = useState(0);
  const [comment, setComment] = useState("");

  function handleInputChange(event) {
    setComment(event.target.value);
  }

  function handleSubmit() {
    const token = localStorage.getItem("token");
    const reviewPost = {
      userId: userId,
      productId: productId,
      rating: ratingValue,
      comment: comment,
    };
    axios
      .post(
        "https://game-accessories-api.onrender.com/api/v1/Reviews",
        reviewPost,
        {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        }
      )
      .then((response) => {
        setSnackBarMessage("Review successfully submitted");
        setOpenSuccessSnackBar(true);
      })
      .catch((error) => {
        setSnackBarMessage("We couldn't submit your review");
        setOpenErrorSnackBar(true);
      });
  }

  return (
    <div className="">
      <FormControl>
        <Typography component="legend">Rating</Typography>
        <Rating
          sx={{ margin: "auto" }}
          name="simple-controlled"
          value={ratingValue}
          onChange={(event, newValue) => {
            setRatingValue(newValue);
          }}
        />
        <Typography sx={{ marginTop: 1 }} component="legend">
          Comment
        </Typography>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          onChange={handleInputChange}
        />
        <Button
          sx={{ marginTop: 2 }}
          variant="contained"
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit Review
        </Button>
      </FormControl>
    </div>
  );
}
