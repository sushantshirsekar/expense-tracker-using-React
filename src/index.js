import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ExpenseProvider from "./ExpenseProvider";
import { Provider } from "react-redux";
import store from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <Provider store={store}>
    <ExpenseProvider>
      <App />
      </ExpenseProvider>
      </Provider>
  </BrowserRouter>
);
