import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./utils/vendors";
import AppWrapper from "./utils/AppWrapper";

ReactDOM.render(
  <AppWrapper>
    <App />
  </AppWrapper>,
  document.getElementById("root")
);
