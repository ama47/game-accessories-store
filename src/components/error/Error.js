import React from "react";
import Error404 from "../images/404.jpg";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Error(prop) {
  const { errorMessage, errorCode } = prop;

  return (
    <div className="flex flex-col justify-center items-center my-10">
      <img className="w-1/6" src={Error404} alt={errorCode} />
      <p className="text-2xl font-bold my-10">{errorMessage}</p>
      <Link to="/">
        <Button variant="contained">Go home</Button>
      </Link>
    </div>
  );
}
