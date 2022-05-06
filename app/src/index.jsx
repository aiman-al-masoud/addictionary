import React, {Component} from "react";
import reactDOM from "react-dom";
import { setTitle } from "./model/Utils.js";
import App from "./view/App.jsx";


//set title
setTitle("Translate")


reactDOM.render(<App/>, document.getElementById("root"))
