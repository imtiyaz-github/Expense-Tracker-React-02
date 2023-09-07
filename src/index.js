import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./components/store/Index";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
const darkTheme = localStorage.getItem("darktheme") === "true";


root.render(
  <div className={darkTheme ? "dark" : null}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </div>
);
