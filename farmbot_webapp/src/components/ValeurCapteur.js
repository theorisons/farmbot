import React from "react";

import { Form, Button, Spinner, Col, Row } from "react-bootstrap";
import { mesureCapteurUrl } from "../fonctions/communicationsServeur";

export default class DeplacementLibre extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      capteur: "",
      message: "",
      couleur: "",
      chargement: false
    };
  }

  componentDidUpdate() {
    //On a fait une demande de mesure
    if (this.state.chargement) {
      this.envoiServeur();
    }
  }

  envoiServeur() {
    const { capteur } = this.state;

    fetch(mesureCapteurUrl(capteur))
      /*.then(reponse => {
                    const rep = reponse.json();
                    console.log(rep);
                }
                )*/
      .then(resultat => resultat.json())
      .then(resultat => this.remiseZero(resultat.message, "#0F0"))
      .catch(error => this.remiseZero(error.message, "#F00"));
  }

  submit(e) {
    e.preventDefault();
    const { capteur } = this.state;
    if (capteur !== "") {
      //Test validite

      //Tous les tests sont validés on envoie au serveur
      let newState = this.state;
      newState.chargement = true;
      this.setState(newState);
    }
  }

  remiseZero(message, couleur) {
    const newState = {
      capteur: "",
      message: message,
      couleur: couleur,
      chargement: false
    };
    this.setState(newState);
  }

  affichage() {
    const capteur = this.state.capteur;

    if (capteur === "") {
      return <div />;
    }
    return <p>Prendre la mesure du capteur {capteur}</p>;
  }

  affichageResultat() {
    return <p style={{ color: this.state.couleur }}>{this.state.message}</p>;
  }

  affichageBouton() {
    if (this.state.capteur === "") {
      return <div />;
    }
    if (this.state.chargement) {
      return (
        <Button variant="dark" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />{" "}
          Chargement...
        </Button>
      );
    }
    return (
      <Button variant="dark" block type="submit">
        Mesurer
      </Button>
    );
  }

  render() {
    return (
      <div>
        <Form
          onSubmit={e => this.submit(e)}
          style={{ color: "#CCC", textAlign: "center", margin: "1em 0" }}
        >
          <Form.Label>
            <Row noGutters>
              <Col sm={6}>Choix du capteur :</Col>
              <Col sm={{ span: 4, offset: 2 }}>
                <select
                  value={this.state.capteur}
                  onChange={e => {
                    let ancienState = this.state;
                    ancienState.capteur = e.target.value;
                    ancienState.message = "";
                    this.setState(ancienState);
                  }}
                >
                  <option value="">-- Sélectionner un capteur --</option>
                  <option value="Humidite">Humidite</option>
                  <option value="Temperature">Température</option>
                </select>
              </Col>
            </Row>
          </Form.Label>
          <br />
          <Form.Label>
            {this.affichage()}
            {this.affichageBouton()}
            {this.affichageResultat()}
          </Form.Label>
        </Form>
      </div>
    );
  }
}
