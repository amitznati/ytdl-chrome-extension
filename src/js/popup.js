
import Greeting from "./popup/greeting_component.jsx";
import React from "react";
import { render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "../css/popup.css";

render(
  <Greeting/>,
  window.document.getElementById("app-container")
);
