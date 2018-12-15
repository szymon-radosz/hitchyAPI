import { GET_USER_DATA, LOGOUT_USER } from "./../actions/types";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        user: action.result
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: action.result
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: "auth",
  storage: storage
};

export default persistReducer(persistConfig, userReducer);
