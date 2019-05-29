import React from "react";
import "./App.css";

import RouterPrincipal from "./router/RouterPrincipal";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCarrot, faBlind } from "@fortawesome/free-solid-svg-icons";

library.add(faCarrot, faBlind);

class App extends React.Component {
  render() {
    return <RouterPrincipal />;
  }
}

export default App;
