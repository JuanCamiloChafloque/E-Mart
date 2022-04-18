import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../../actions/usersActions";
import Loader from "../layouts/Loader";

const ProtectedRoute = ({ children, isAdmin = false }) => {
  const dispatch = useDispatch();
  const {
    isAuthenticated = false,
    loading = true,
    user,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
  }, [user, dispatch]);

  if (loading) return <Loader />;
  if (!loading && isAuthenticated) {
    if (isAdmin === true && user.role !== "admin") {
      return <Navigate to="/login" />;
    }

    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
