import * as Actions from "../constants";
import { DispatchAction } from "../../types/store";

const initialState = {
  isLoading: false,
  error: null,
  total: 0,
  limit: 0,
  list: []
};

const orderReducer = (state = initialState, action: DispatchAction) => {
  switch (action.type) {
  case Actions.CREATE_ORDER_REQUEST: {
    return {
      ...state,
      isLoading: true
    };
  }
  case Actions.CREATE_ORDER_SUCCESS: {
    return {
      ...state,
      isLoading: false
    };
  }
  case Actions.CREATE_ORDER_FAILURE: {
    return {
      ...state,
      isLoading: false,
      error: action.error
    };
  }

  case Actions.GET_ORDER_LIST_REQUEST: {
    return {
      ...state,
      isLoading: true
    };
  }
  case Actions.GET_ORDER_LIST_SUCCESS: {
    return {
      ...state,
      total: action.payload.total,
      limit: action.payload.limit,
      list: action.payload.list,
      isLoading: false
    };
  }
  case Actions.GET_ORDER_LIST_FAILURE: {
    return {
      ...state,
      isLoading: false,
      error: action.error
    };
  }

  default: {
    return state;
  }
  }
};

export default orderReducer;