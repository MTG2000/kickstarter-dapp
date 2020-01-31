import React from "react";
import "./App.scss";
import ScrollToTop from "./ScrollToTopController";
import { BrowserRouter } from "react-router-dom";
import "./aos";
import MaterialTheme from "./MaterialTheme";

const AppWrapper = props => {
  return (
    <BrowserRouter>
      <MaterialTheme>
        <ScrollToTop>{props.children}</ScrollToTop>
      </MaterialTheme>
    </BrowserRouter>
  );
};

export default AppWrapper;
