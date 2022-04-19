import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearUserErrors } from "../../actions/usersActions";
import MetaData from "../layouts/MetaData";

const ForgotPassword = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const { loading, message, error } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearUserErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [error, alert, dispatch, message]);

  const submitForgotHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  return (
    <Fragment>
      <MetaData title="Forgot Password" />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitForgotHandler}>
            <h1 className="mb-3">Forgot Password</h1>
            <div className="form-group">
              <label htmlFor="email_field">Enter Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading ? true : false}
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
