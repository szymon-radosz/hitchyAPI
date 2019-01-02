import { GET_USER_DATA, LOGOUT_USER } from "./types";
import axios from "axios";

export const loginUser = userData => dispatch => {
  //console.log(userData.password);
  const login = axios
    .post(`http://phplaravel-226937-693336.cloudwaysapps.com/api/login`, {
      emailOrNickname: userData.emailOrNickname,
      password: userData.password
    })
    .then(user => {
      //console.log(user);
      dispatch({
        type: GET_USER_DATA,
        payload: user.data
      });
    });

  //console.log(login);

  if (login.status == 200 && login.data.userId != null) {
    const test = dispatch({
      type: GET_USER_DATA,
      payload: login.data
    });
    //console.log(test);
  }
};

export const logoutUser = () => dispatch => {
  dispatch({
    type: LOGOUT_USER,
    payload: ""
  });
};
