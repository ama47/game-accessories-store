import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Popover, FormControl, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { GridRowModes, GridToolbarContainer } from "@mui/x-data-grid";
import axios from "axios";

export default function ProductEditToolbar(props) {
  const {
    setRows,
    setRowModesModel,
    setOpenErrorSnackBar,
    setOpenSuccessSnackBar,
    setSnackBarMessage,
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [productData, setProductData] = useState({
    productName: "",
    productColor: "",
    productImage: "",
    description: "",
    sku: 0,
    productPrice: 0,
    weight: 0,
    subCategoryId: "",
    subCategoryName: "",
  });
  function onChangeHandler(event) {
    if (
      event.target.id === "sku" ||
      event.target.id === "productPrice" ||
      event.target.id === "weight"
    ) {
      setProductData({
        ...productData,
        [event.target.id]: Number(event.target.value),
      });
    } else {
      setProductData({
        ...productData,
        [event.target.id]: event.target.value,
      });
    }
  }

  const handleSubmit = () => {
    console.log(productData);
    const token = localStorage.getItem("token");
    axios
      .post(
        "https://game-accessories-api.onrender.com/api/v1/Products",
        productData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setSnackBarMessage(`Product successfully added!`);
        setOpenSuccessSnackBar(true);
        setRows((oldRows) => [
          ...oldRows,
          {
            ...response.data,
            isNew: true,
            id: response.data.productId,
          },
        ]);
        setRowModesModel((oldModel) => ({
          ...oldModel,
          [id]: { mode: GridRowModes.View },
        }));
      })
      .catch((error) => {
        setSnackBarMessage(`Error: ${error}`);
        setOpenErrorSnackBar(true);
      });
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <FormControl variant="standard">
          <TextField
            id="productName"
            label="Product Name"
            onChange={onChangeHandler}
          />
          <TextField
            id="productImage"
            label="Product Image URL"
            onChange={onChangeHandler}
          />
          <TextField
            id="productColor"
            label="Product Color"
            onChange={onChangeHandler}
          />
          <TextField
            id="description"
            label="Description"
            multiline
            onChange={onChangeHandler}
          />
          <TextField
            id="sku"
            label="SKU"
            type="number"
            onChange={onChangeHandler}
          />
          <TextField
            id="productPrice"
            label="Product Price"
            type="number"
            onChange={onChangeHandler}
          />
          <TextField
            id="weight"
            label="Weight"
            type="number"
            onChange={onChangeHandler}
          />
          <TextField
            id="subCategoryId"
            label="Sub Category ID"
            onChange={onChangeHandler}
          />
          <TextField
            id="subCategoryName"
            label="Sub Category Name"
            onChange={onChangeHandler}
          />
          <Button onClick={() => handleSubmit()}>Add Product</Button>
        </FormControl>
      </Popover>
    </GridToolbarContainer>
  );
}
