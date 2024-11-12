import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";

export default function UsersTable(prop) {
  const { setSnackBarMessage, setOpenSuccessSnackBar, setOpenErrorSnackBar } =
    prop;
  const [rows, setRows] = useState([]);
  const token = localStorage.getItem("token");

  const deleteUser = (userId) => {
    let isSuccess = false;
    axios
      .delete(
        `https://game-accessories-api.onrender.com/api/v1/Users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setSnackBarMessage("User successfully deleted!");
        setOpenSuccessSnackBar(true);
        isSuccess = true;
      })
      .catch((error) => {
        setSnackBarMessage(`Error: ${error}`);
        setOpenErrorSnackBar(true);
      });

    return isSuccess;
  };

  const handleDeleteClick = (id) => () => {
    const deletedRow = rows.find((row) => row.id === id);
    const isSuccess = deleteUser(deletedRow.userId);
    if (isSuccess) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const columns = [
    { field: "userId", headerName: "ID", width: 180, editable: false },
    { field: "username", headerName: "Username", width: 180, editable: false },
    {
      field: "firstName",
      headerName: "First Name",
      width: 180,
      editable: false,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 180,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
      editable: false,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 180,
      editable: false,
    },
    {
      field: "birthDate",
      headerName: "Birthday",
      //type: "date",
      width: 180,
      editable: false,
    },
    {
      field: "role",
      headerName: "Role",
      width: 100,
      editable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  let usersUrl = `https://game-accessories-api.onrender.com/api/v1/Users`;
  useEffect(() => {
    function getUsers() {
      axios
        .get(usersUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setRows(
            response.data.map((user) => ({
              ...user,
              id: user.userId,
            }))
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getUsers();
  }, [usersUrl, token]);

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
