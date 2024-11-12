import React from "react";
import { useParams } from "react-router-dom";
import Error from "../components/error/Error";
import ProductsTable from "../components/tables/ProductsTable";
import UsersTable from "../components/tables/UsersTable";
import OrdersTable from "../components/tables/OrdersTable";

export default function EntityPage(prop) {
  const params = useParams();
  const { setSnackBarMessage, setOpenSuccessSnackBar, setOpenErrorSnackBar } =
    prop;

  switch (params.tableName) {
    case "Products":
      return (
        <div>
          <ProductsTable
            setSnackBarMessage={setSnackBarMessage}
            setOpenSuccessSnackBar={setOpenSuccessSnackBar}
            setOpenErrorSnackBar={setOpenErrorSnackBar}
          />
        </div>
      );
    case "Users":
      return (
        <div>
          <UsersTable
            setSnackBarMessage={setSnackBarMessage}
            setOpenSuccessSnackBar={setOpenSuccessSnackBar}
            setOpenErrorSnackBar={setOpenErrorSnackBar}
          />
        </div>
      );
    case "Orders":
      return (
        <div>
          <OrdersTable
            setSnackBarMessage={setSnackBarMessage}
            setOpenSuccessSnackBar={setOpenSuccessSnackBar}
            setOpenErrorSnackBar={setOpenErrorSnackBar}
          />
        </div>
      );
    default:
      return (
        <div>
          <Error errorMessage={"We couldn't find your page!"} errorCode={404} />
        </div>
      );
  }
}
