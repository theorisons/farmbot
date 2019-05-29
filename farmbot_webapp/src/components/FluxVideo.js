import React from "react";

import { Spinner, Row, Col } from "react-bootstrap";
import { fluxVideoUrl } from "../fonctions/communicationsServeur";

export default class FluxVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chargement: true
    };
  }

  componentDidMount() {
    //On veut recevoir de la video
    console.log("OK");
    //this.setState({chargement : false});
  }
  /*
        envoiServeur() {
    
            fetch(fluxVideoUrl())
               
                .then(resultat => resultat.json())
                .then(resultat => this.remiseZero(resultat.message, "#0F0"))
                .catch(error => this.remiseZero(error.message, "#F00"));
        }
    */

  chargement() {
    if (this.state.chargement) {
      return <Spinner animation="grow" />;
    }
  }

  render() {
    return <div>{this.chargement()}</div>;
  }
}
