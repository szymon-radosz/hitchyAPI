import { GET_USER_DATA, REGISTER_NEW_USER } from "./../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        user: action.result
      };
    default:
      return state;
  }
}
