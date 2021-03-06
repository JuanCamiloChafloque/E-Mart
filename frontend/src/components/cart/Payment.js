import React, { Fragment, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import CheckoutSteps from "./CheckoutSteps";
import { createOrder, clearOrderErrors } from "../../actions/orderActions";

const options = {
  style: {
    base: {
      fontSize: "16px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

const Payment = () => {
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearOrderErrors());
    }
  }, [dispatch, alert, error]);

  const submitPaymentHandler = async (e) => {
    e.preventDefault();
    document.querySelector("#pay_btn").disabled = true;
    let res;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      res = await axios.post("/api/v1/payments", paymentData, config);
      const clientSecret = res.data.client_secret;

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          const order = {
            orderItems: cartItems,
            shippingInfo: shippingInfo,
            itemsPrice: orderInfo.itemsPrice,
            taxPrice: orderInfo.taxPrice,
            shippingPrice: orderInfo.shippingPrice,
            totalPrice: orderInfo.totalPrice,
            paymentInfo: {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
            },
          };
          dispatch(createOrder(order));
          navigate("/success");
        } else {
          alert.error("There was some issue with the payment processing...");
        }
      }
    } catch (err) {
      document.querySelector("#pay_btn").disabled = false;
      alert.error(err.response.data.message);
    }
  };

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps shipping confirmOrder payment />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitPaymentHandler}>
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                options={options}
              />
            </div>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Pay - ${orderInfo && orderInfo.totalPrice}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
