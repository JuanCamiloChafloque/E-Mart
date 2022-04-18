import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layouts/MetaData";
import Product from "./products/Product";
import Loader from "./layouts/Loader";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getProducts } from "../actions/productsActions";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);

  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage));
  }, [dispatch, error, alert, keyword, currentPage]);

  const setCurrentPageNumber = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Welcome! Buy the best products online" />
          <h1 id="products_heading">Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
          {resPerPage <= productsCount && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNumber}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </>
  );
};

export default Home;
