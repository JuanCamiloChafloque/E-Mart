import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderDetails,
  updateOrder,
  clearOrderErrors,
} from "../../actions/orderActions";
import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar";
import Loader from "../layouts/Loader";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

const ProcessOrder = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const { loading, order } = useSelector((state) => state.orderDetails);
  const { error, isUpdated } = useSelector((state) => state.order);

  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(getOrderDetails(id));

    if (error) {
      alert.error(error);
      dispatch(clearOrderErrors());
    }

    if (isUpdated) {
      alert.success("Order processed successfully...");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, error, alert, isUpdated, navigate, id]);

  const submitProcessHandler = () => {
    dispatch(updateOrder(id, { status }));
  };

  return (
    <Fragment>
      <MetaData title={"Process Order"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            {loading ? (
              <Loader />
            ) : (
              <div className="row d-flex justify-content-around">
                <div className="col-12 col-lg-7 order-details">
                  <h1 className="my-5">Order # {order._id}</h1>

                  <h4 className="mb-4">Shipping Info</h4>
                  <p>
                    <b>Name:</b> {order.user && order.user.name}
                  </p>
                  <p>
                    <b>Phone:</b>{" "}
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </p>
                  <p className="mb-4">
                    <b>Address:</b>{" "}
                    {order.shippingInfo &&
                      order.shippingInfo.address +
                        "," +
                        order.shippingInfo.city +
                        "," +
                        order.shippingInfo.postalCode +
                        "," +
                        order.shippingInfo.country}
                  </p>
                  <p>
                    <b>Amount:</b> ${order.totalPrice}
                  </p>

                  <hr />

                  <h4 className="my-4">Payment</h4>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    <b>
                      {order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </b>
                  </p>

                  <h4 className="my-4">Stripe ID</h4>
                  <p>
                    <b>{order.paymentInfo && order.paymentInfo.id}</b>
                  </p>

                  <h4 className="my-4">Order Status:</h4>
                  <p
                    className={
                      order.orderStatus &&
                      String(order.orderStatus).includes("Delivered")
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    <b>{order.orderStatus}</b>
                  </p>

                  <h4 className="my-4">Order Items:</h4>

                  <hr />
                  <div className="cart-item my-1">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div className="row my-5" key={item.product}>
                          <div className="col-4 col-lg-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              height="45"
                              width="65"
                            />
                          </div>

                          <div className="col-5 col-lg-5">
                            <Link to={"/product/" + item.product}>
                              {item.name}
                            </Link>
                          </div>

                          <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p>${item.price}</p>
                          </div>

                          <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <p>{item.quantity} Piece(s)</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <hr />
                </div>

                <div className="col-12 col-lg-3 mt-5">
                  <h4 className="my-4">Status</h4>

                  <div className="form-group">
                    <select
                      className="form-control"
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>

                  <button
                    className="btn btn-primary btn-block"
                    onClick={submitProcessHandler}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
