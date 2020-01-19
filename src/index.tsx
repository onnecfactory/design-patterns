import * as React from "react";
import { render } from "react-dom";
//import "./design-patterns/mediator-pattern";
//import "./design-patterns/observer-pattern";
import "./design-patterns/chain-of-responsability";

import App from "./App";

const rootElement = document.getElementById("root");
render(<App />, rootElement);
