import React from "react";
import { useState, useEffect } from "react";
import ProductEditToolbar from "./ProductEditToolbar";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import axios from "axios";

export default function ProductsTable(prop) {
  const { setSnackBarMessage, setOpenSuccessSnackBar, setOpenErrorSnackBar } =
    prop;
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  const updateProduct = (product) => {
    const token = localStorage.getItem("token");
    const productId = product.productId;
    let isSuccess = false;
    let updatedProduct = product;
    delete updatedProduct.addedDate;
    delete updatedProduct.averageRating;
    delete updatedProduct.id;
    delete updatedProduct.isNew;
    delete updatedProduct.productId;
    delete updatedProduct.subCategoryId;
    delete updatedProduct.subCategoryName;
    axios
      .put(
        `https://game-accessories-api.onrender.com/api/v1/Products/${productId}`,
        updatedProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setSnackBarMessage("Product successfully updated!");
        setOpenSuccessSnackBar(true);
        isSuccess = true;
      })
      .catch((error) => {
        setSnackBarMessage(`Error: ${error}`);
        setOpenErrorSnackBar(true);
      });

    return isSuccess;
  };

  const deleteProduct = (productId) => {
    let isSuccess = false;
    const token = localStorage.getItem("token");
    axios
      .delete(
        `https://game-accessories-api.onrender.com/api/v1/Products/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setSnackBarMessage("Product successfully deleted!");
        setOpenSuccessSnackBar(true);
        isSuccess = true;
      })
      .catch((error) => {
        setSnackBarMessage(`Error: ${error}`);
        setOpenErrorSnackBar(true);
      });

    return isSuccess;
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    const deletedRow = rows.find((row) => row.id === id);
    const isSuccess = deleteProduct(deletedRow.productId);
    if (isSuccess) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    const isSuccess = updateProduct(updatedRow);
    if (isSuccess) {
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "productId", headerName: "ID", width: 180, editable: false },
    { field: "productName", headerName: "Name", width: 180, editable: true },
    {
      field: "productImage",
      headerName: "Image",
      width: 180,
      editable: true,
    },
    {
      field: "productColor",
      headerName: "Color",
      width: 120,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 180,
      editable: true,
    },
    {
      field: "sku",
      headerName: "SKU",
      type: "number",
      width: 80,
      editable: true,
    },
    {
      field: "productPrice",
      headerName: "Price",
      type: "number",
      width: 80,
      editable: true,
    },
    {
      field: "weight",
      headerName: "Weight",
      type: "number",
      width: 80,
      editable: true,
    },
    {
      field: "addedDate",
      headerName: "Added date",
      //type: "date",
      width: 180,
      editable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
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

  let productsUrl = `https://game-accessories-api.onrender.com/api/v1/Products?Limit=100&Offset=0`;
  useEffect(() => {
    function getProducts() {
      axios
        .get(productsUrl)
        .then((response) => {
          setRows(
            response.data.products.map((product) => ({
              ...product,
              id: product.productId,
            }))
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getProducts();
  }, [productsUrl]);

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
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          experimentalFeatures={{ newEditingApi: true }}
          slots={{
            toolbar: ProductEditToolbar,
          }}
          slotProps={{
            toolbar: {
              setRows,
              setRowModesModel,
              rowModesModel,
              setOpenErrorSnackBar,
              setOpenSuccessSnackBar,
              setSnackBarMessage,
            },
          }}
        />
      </Box>
    </div>
  );
}
