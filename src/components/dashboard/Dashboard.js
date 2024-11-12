import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard(prop) {
  return (
    <div className="my-10 px-72">
      <h2 className="text-2xl font-extrabold text-gray-800 mb-10">Dashboard</h2>
      <div className="flex flex-col gap-y-10">
        <Link to="/dashboard/Products">
          <Button variant="contained">Products Table</Button>
        </Link>
        <Link to="/dashboard/Users">
          <Button variant="contained">Users Table</Button>
        </Link>
        <Link to="/dashboard/Orders">
          <Button variant="contained">Orders Table</Button>
        </Link>
      </div>
    </div>
  );
}
