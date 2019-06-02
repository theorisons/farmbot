import React from "react";

import Iframe from "react-iframe";
import { fluxVideoUrl } from "../fonctions/communicationsServeur";

export default class FluxVideo extends React.Component {
  render() {
    return (
      <div>
        <Iframe
          url={fluxVideoUrl}
          width="480px"
          height="270px"
        />
      </div>
    );
  }
}
