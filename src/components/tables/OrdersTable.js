import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

export default function OrdersTable(prop) {
  const { setSnackBarMessage, setOpenSuccessSnackBar, setOpenErrorSnackBar } =
    prop;
  const [rows, setRows] = useState([]);
  const token = localStorage.getItem("token");

  const columns = [
    { field: "id", headerName: "Order ID", width: 180, editable: false },
    { field: "userId", headerName: "User ID", width: 180, editable: false },
    {
      field: "orderDate",
      headerName: "Order Date",
      //type: "date",
      width: 180,
      editable: false,
    },
    {
      field: "shipDate",
      headerName: "Shipping Date",
      //type: "date",
      width: 180,
      editable: false,
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      width: 110,
      editable: false,
    },
    { field: "address", headerName: "Address", width: 180, editable: false },
    { field: "city", headerName: "City", width: 180, editable: false },
    { field: "state", headerName: "State", width: 180, editable: false },
    {
      field: "postalCode",
      headerName: "Postal ZIP",
      width: 100,
      editable: false,
    },
  ];

  let ordersUrl =
    "https://game-accessories-api.onrender.com/api/v1/Orders?limit=100";
  useEffect(() => {
    function getOrders() {
      axios
        .get(ordersUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setRows(response.data);
        })
        .catch((error) => {
          setSnackBarMessage(`Error: ${error}`);
          setOpenErrorSnackBar(true);
        });
    }
    getOrders();
  }, [ordersUrl, token]);

  return (
    <div className="mx-4 my-2">
      <Box
        sx={{
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </div>
  );
}
