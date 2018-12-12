import React, { Component } from "react";
import "./App.css";
import Main from "./components/Main/Main";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Main store={store} />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
