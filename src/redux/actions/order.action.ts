import { Dispatch } from "redux";
import * as Actions from "../constants";
import axios, { AxiosError } from "axios";
import { handleAxiosError } from "../../utils/functions";

// Get order list action
export const getOrderList: any = (limit?: number, page?: number) => async (dispatch: Dispatch) => {
  dispatch({ type: Actions.GET_ORDER_LIST_REQUEST });

  return axios.get(`${process.env.REACT_APP_SERVER_API}/order?limit=${limit}&page=${page}`)
    .then(response => {
      dispatch({
        type: Actions.GET_ORDER_LIST_SUCCESS,
        payload: response.data
      });

      return response.data;
    })
    .catch((error: AxiosError) => {
      dispatch({
        type: Actions.GET_ORDER_LIST_FAILURE,
        error
      });

      handleAxiosError(error);
    });
};

// Create new order action
export const placeOrder: any = (data: any) => async (dispatch: Dispatch) => {
  dispatch({ type: Actions.CREATE_ORDER_REQUEST });

  return axios.post(`${process.env.REACT_APP_SERVER_API}/order`, data)
    .then(response => {
      dispatch({ type: Actions.CREATE_ORDER_SUCCESS });
      return response.data;
    })
    .catch((error: AxiosError) => {
      dispatch({
        type: Actions.CREATE_ORDER_FAILURE,
        error
      });

      handleAxiosError(error);
    });
};