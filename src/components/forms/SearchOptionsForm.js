import React from "react";
import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";

export default function SearchOptionsForm(prop) {
  const {
    setMinPriceInput,
    setMaxPriceInput,
    colorSelect,
    setColorSelect,
    sortSelect,
    setSortSelect,
  } = prop;

  function HandleMinPriceInput(event) {
    setMinPriceInput(event.target.value);
  }
  function HandleMaxPriceInput(event) {
    setMaxPriceInput(event.target.value);
  }
  function HandleColorSelect(event) {
    setColorSelect(event.target.value);
  }
  function HandleSortSelect(event) {
    if (event.target.value === 0) setSortSelect(0);
    else if (event.target.value === 1) setSortSelect(1);
  }
  return (
    <div className="flex justify-center gap-x-7 gap-y-8 flex-wrap">
      <TextField
        id="standard-basic"
        label="Min Price"
        variant="standard"
        type="number"
        onChange={HandleMinPriceInput}
      />
      <TextField
        id="standard-basic"
        label="Max Price"
        variant="standard"
        type="number"
        onChange={HandleMaxPriceInput}
      />
      <FormControl sx={{ width: 100 }}>
        <InputLabel>Color</InputLabel>
        <Select value={colorSelect} label="Color" onChange={HandleColorSelect}>
          <MenuItem value={"Black"}>Black</MenuItem>
          <MenuItem value={"White"}>White</MenuItem>
          <MenuItem value={"silver"}>Silver</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ width: 140 }}>
        <InputLabel>Sort</InputLabel>
        <Select value={sortSelect} label="Sort" onChange={HandleSortSelect}>
          <MenuItem value={0}>Ascending</MenuItem>
          <MenuItem value={1}>Descending</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
