import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  NEW_PASSWORD_REQUEST,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/auth/login",
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      "/api/v1/auth/register",
      userData,
      config
    );

    dispatch({ type: REGISTER_SUCCESS, payload: data.user });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get("/api/v1/auth/me");

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (err) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/auth/logout");

    dispatch({ type: LOGOUT_SUCCESS });
  } catch (err) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.put("/api/v1/auth/me", userData, config);

    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (err) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      "/api/v1/auth/me/password",
      passwords,
      config
    );

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (err) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/auth/forgotpassword",
      email,
      config
    );

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (err) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      "/api/v1/auth/password/reset/" + token,
      passwords,
      config
    );

    dispatch({ type: NEW_PASSWORD_SUCCESS, payload: data.success });
  } catch (err) {
    dispatch({
      type: NEW_PASSWORD_FAIL,
      payload: err.response.data.message,
    });
  }
};

export const clearUserErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
