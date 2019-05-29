import React from "react";
import "./Camera.css";

import FluxCamera from "../components/FluxVideo.js";

export default class Camera extends React.Component {
  render() {
    return (
      <div id="mainContainerCamera">
        <h1 id="titreCamera">Retour caméra</h1>
        <FluxCamera />
      </div>
    );
  }
}
