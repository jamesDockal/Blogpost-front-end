import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { UserProvider } from "./contexts/UserContext";

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById("root")
);
