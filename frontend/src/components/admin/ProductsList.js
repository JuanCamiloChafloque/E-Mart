import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminProducts,
  deleteProduct,
  clearProductErrors,
} from "../../actions/productsActions";
import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar";
import Loader from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import { REMOVE_PRODUCT_RESET } from "../../constants/productConstants";

const ProductsList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      alert.error(error);
      dispatch(clearProductErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearProductErrors());
    }

    if (isDeleted) {
      alert.success("Product deleted successfully...");
      dispatch({ type: REMOVE_PRODUCT_RESET });
      navigate("/admin/products");
    }
  }, [dispatch, error, deleteError, alert, isDeleted, navigate]);

  const submitRemoveHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "Product ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    products.forEach((product) =>
      data.rows.push({
        id: product._id,
        name: product.name,
        price: "$" + product.price,
        stock: product.stock,
        actions: (
          <>
            <Link
              to={"/admin/product/" + product._id}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => submitRemoveHandler(product._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      })
    );

    return data;
  };
  return (
    <Fragment>
      <MetaData title="Products List" />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Products</h1>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setProducts()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductsList;
