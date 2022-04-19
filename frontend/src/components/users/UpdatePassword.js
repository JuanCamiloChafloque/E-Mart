import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearUserErrors } from "../../actions/usersActions";
import MetaData from "../layouts/MetaData";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

const UpdatePassword = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isUpdated, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearUserErrors());
    }

    if (isUpdated) {
      alert.success("Password updated successfully...");
      dispatch({ type: UPDATE_PASSWORD_RESET });
      navigate("/me");
    }
  }, [error, alert, dispatch, navigate, isUpdated]);

  const submitUpdateHandler = (e) => {
    e.preventDefault();
    dispatch(updatePassword({ password, oldPassword }));
  };

  return (
    <Fragment>
      <MetaData title="Change Password" />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitUpdateHandler}>
            <h1 className="mt-2 mb-5">Update Password</h1>
            <div className="form-group">
              <label htmlFor="old_password_field">Old Password</label>
              <input
                type="password"
                id="old_password_field"
                className="form-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="new_password_field">New Password</label>
              <input
                type="password"
                id="new_password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading ? true : false}
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePassword;