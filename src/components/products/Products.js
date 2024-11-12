import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LinearProgress,
  Pagination,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Product from "./Product";
import Error from "../error/Error";
import SearchOptionsForm from "../forms/SearchOptionsForm";

export default function Products() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const HandlePageChange = (event, value) => {
    setPage(value);
  };
  const [searchInput, setSearchInput] = useState("");
  function HandleSearchInput(event) {
    setSearchInput(event.target.value);
  }
  const [minPriceInput, setMinPriceInput] = useState(0);
  const [maxPriceInput, setMaxPriceInput] = useState(10000);
  const [colorSelect, setColorSelect] = useState("");
  const [sortSelect, setSortSelect] = useState(0);

  const [productsResponse, setProductsResponse] = useState({
    products: [],
    productsCount: 0,
  });

  const limit = 9;
  const offset = (page - 1) * limit;
  function getUrl() {
    let productsUrl = `https://game-accessories-api.onrender.com/api/v1/Products?Limit=${limit}&Offset=${offset}`;
    if (searchInput) productsUrl += `&Search=${searchInput}`;
    if (minPriceInput) productsUrl += `&MinPrice=${minPriceInput}`;
    if (maxPriceInput) productsUrl += `&MaxPrice=${maxPriceInput}`;
    if (colorSelect) productsUrl += `&Colors=${colorSelect}`;
    if (sortSelect) productsUrl += `&SortOrder=${sortSelect}`;
    console.log(productsUrl);
    return productsUrl;
  }

  useEffect(() => {
    function getProducts() {
      axios
        .get(getUrl())
        .then((response) => {
          setProductsResponse(response.data);
          setLoading(false);
        })
        .catch((response) => {
          setError(response);
          setLoading(false);
        });
    }
    window.scrollTo({ top: 0 });
    getProducts();
  }, [
    offset,
    searchInput,
    minPriceInput,
    maxPriceInput,
    colorSelect,
    sortSelect,
  ]);

  if (loading) {
    return (
      <div className="text-center my-10">
        <LinearProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Error errorMessage={"We couldn't find products!"} errorCode={404} />
    );
  }

  return (
    <div className="font-[sans-serif] p-4 mx-auto lg:max-w-5xl md:max-w-3xl max-w-lg">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-12">Products</h2>
      <div>
        <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">
            Search for product
          </InputLabel>
          <Input
            sx={{ width: 350 }}
            className="my-5"
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            onChange={HandleSearchInput}
          />
        </FormControl>
        <SearchOptionsForm
          minPriceInput={minPriceInput}
          setMinPriceInput={setMinPriceInput}
          maxPriceInput={maxPriceInput}
          setMaxPriceInput={setMaxPriceInput}
          colorSelect={colorSelect}
          setColorSelect={setColorSelect}
          sortSelect={sortSelect}
          setSortSelect={setSortSelect}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
        {productsResponse.products.length !== 0 ? (
          <>
            {productsResponse.products.map((product, i) => (
              <Product product={product} key={i} />
            ))}
          </>
        ) : (
          <p>No results.</p>
        )}
      </div>
      {productsResponse.products.length !== 0 ? (
        <>
          <Stack alignItems="center">
            <Pagination
              sx={{ marginBottom: 2 }}
              size="large"
              count={Math.ceil(productsResponse.productsCount / limit)}
              shape="rounded"
              onChange={HandlePageChange}
            />
          </Stack>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
