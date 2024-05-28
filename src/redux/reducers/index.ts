import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import orderReducer from "./order.reducer";

const reducers = combineReducers({
  userReducer,
  orderReducer
});

export default reducers;
