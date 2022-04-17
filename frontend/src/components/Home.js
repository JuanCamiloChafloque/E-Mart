import React, { Fragment, useEffect } from "react";
import MetaData from "./layouts/MetaData";
import Product from "./products/Product";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productsActions";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
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
    </Fragment>
  );
};

export default Home;
