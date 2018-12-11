import React, { Component } from "react";
import "./App.css";
import Main from "./components/Main/Main";
import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main store={store} />
      </Provider>
    );
  }
}

export default App;
