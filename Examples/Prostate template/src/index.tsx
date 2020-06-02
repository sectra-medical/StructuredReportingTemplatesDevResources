import * as React from "react";
import * as ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@sectramedical/srt-components/dist/sectra-styling.css";
import "../styling.css";

import { Main } from "./components/Main";


ReactDOM.render(
    <Main />,
    document.getElementById("react-container")
);