import { GET_USER_DATA, REGISTER_NEW_USER } from "./types";
import axios from "axios";

export const loginUser = userData => dispatch => {
  console.log(userData.password);
  const login = axios
    .post(`http://127.0.0.1:8000/api/login`, {
      emailOrNickname: userData.emailOrNickname,
      password: userData.password
    })
    .then(user => {
      console.log(user);
      dispatch({
        type: GET_USER_DATA,
        result: user.data
      });
    });

  console.log(login);

  if (login.status == 200 && login.data.userId != null) {
    /* sessionStorage.setItem("userId", "");
        sessionStorage.setItem("userNickName", "");
        sessionStorage.setItem("userEmail", "");
        sessionStorage.setItem("userId", loginUser.data.userId);
        sessionStorage.setItem("userNickName", loginUser.data.userNickName);
        sessionStorage.setItem("userEmail", loginUser.data.userEmail);
        this.props.loginUser(loginUser.data.userNickName);
        this.props.showAlertSuccess("Poprawnie zalogowano.");*/
    const test = dispatch({
      type: GET_USER_DATA,
      result: login.data
    });
    console.log(test);
  }
};
