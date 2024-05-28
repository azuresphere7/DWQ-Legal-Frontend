import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";

import * as Actions from "../constants";
import { LoginUserInput, RegisterUserInput } from "../../lib/validations/user.schema";
import { ResetPasswordActionInput, VerifyEmailInput } from "../../types/user";
import { handleAxiosError } from "../../utils/functions";

// Register action
export const registerUser: any = (data: RegisterUserInput) => async (dispatch: Dispatch) => {
  dispatch({ type: Actions.USER_REGISTER_REQUEST });

  return axios.post(`${process.env.REACT_APP_SERVER_API}/user/register`, data)
    .then(response => {
      if (response.data.success) {
        localStorage.setItem("access-token", response.data.token);
        dispatch(loginWithToken(false));
      }

      dispatch({ type: Actions.USER_REGISTER_SUCCESS });
      return response.data;
    })
    .catch((error: AxiosError) => {
      dispatch({
        type: Actions.USER_REGISTER_FAILURE,
        error
      });

      handleAxiosError(error);
    });
};

// Login action
export const loginUser: any = (data: LoginUserInput) => async (dispatch: Dispatch) => {
  dispatch({ type: Actions.USER_LOGIN_REQUEST });

  return axios.post(`${process.env.REACT_APP_SERVER_API}/user/login`, data)
    .then(response => {
      dispatch({ type: Actions.USER_LOGIN_SUCCESS });

      if (response.data.success) {
        localStorage.setItem("access-token", response.data.token);
        dispatch(loginWithToken(true));
      }
      return response.data;
    })
    .catch((error: AxiosError) => {
      dispatch({
        type: Actions.USER_LOGIN_FAILURE,
        error
      });

      handleAxiosError(error);
    });
};

// Login with JWT token action
export const loginWithToken: any = (refresh: boolean = true) => async (dispatch: Dispatch) => {
  if (refresh) {
    dispatch({ type: Actions.LOGIN_WITH_TOKEN_REQUEST });
  }

  const accessToken: string | null = localStorage.getItem("access-token");
  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  return axios.get(`${process.env.REACT_APP_SERVER_API}/user/access-token`)
    .then(response => {
      dispatch({
        type: Actions.LOGIN_WITH_TOKEN_SUCCESS,
        payload: response.data
      });

      return response.data;
    })
    .catch(error => {
      dispatch({
        type: Actions.LOGIN_WITH_TOKEN_FAILURE,
        error
      });

      localStorage.removeItem("access-token");
    });
};

// Verify user email action
export const verifyEmail: any = (data: VerifyEmailInput) => async (dispatch: Dispatch) => {
  dispatch({ type: Actions.VERIFY_EMAIL_REQUEST });

  return axios.post(`${process.env.REACT_APP_SERVER_API}/user/verify-email`, data)
    .then(response => {
      dispatch({ type: Actions.VERIFY_EMAIL_SUCCESS });
      return response.data;
    })
    .catch((error: AxiosError) => {
      dispatch({
        type: Actions.VERIFY_EMAIL_FAILURE,
        error
      });

      handleAxiosError(error);
    });
};

// Resend a verification code if didn't receive
export const resendCode: any = (email: string) => async (dispatch: Dispatch) => {
  dispatch({ type: Actions.RESEND_EMAIL_REQUEST });

  return axios.post(`${process.env.REACT_APP_SERVER_API}/user/resend-code`, { email })
    .then(response => {
      dispatch({ type: Actions.RESEND_EMAIL_SUCCESS });
      return response.data;
    })
    .catch((error: AxiosError) => {
      dispatch({ type: Actions.RESEND_EMAIL_FAILURE });
      handleAxiosError(error);
    });
};

// Confirm email to send a code if forgot password
export const confirmEmail: any = (email: string) => async (dispatch: Dispatch) => {
  dispatch({ type: Actions.FORGOT_PASSWORD_EMAIL_REQUEST });

  return axios.post(`${process.env.REACT_APP_SERVER_API}/user/forgot-password`, { email })
    .then(response => {
      dispatch({ type: Actions.FORGOT_PASSWORD_EMAIL_SUCCESS });
      return response.data;
    })
    .catch((error: AxiosError) => {
      dispatch({ type: Actions.FORGOT_PASSWORD_EMAIL_FAILURE });
      handleAxiosError(error);
    });
};

// Verify code sent to the email once the email is confirmed
export const resetPassword: any = (data: ResetPasswordActionInput) => async (dispatch: Dispatch) => {
  dispatch({ type: Actions.RESET_PASSWORD_REQUEST });

  return axios.post(`${process.env.REACT_APP_SERVER_API}/user/reset-password`, data)
    .then(response => {
      dispatch({ type: Actions.RESET_PASSWORD_SUCCESS });
      return response.data;
    })
    .catch((error: AxiosError) => {
      dispatch({ type: Actions.RESET_PASSWORD_FAILURE });
      handleAxiosError(error);
    });
};

// Logout user action
export const logoutUser: any = () => {
  localStorage.removeItem("access-token");
  return { type: Actions.USER_LOGOUT };
};