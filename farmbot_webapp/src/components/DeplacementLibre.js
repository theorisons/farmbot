import React from "react";

import { Form, Button, Spinner, Row, Col } from "react-bootstrap";
import { deplacementManuelUrl } from "../fonctions/communicationsServeur";

export default class DeplacementLibre extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      axe: "",
      valeur: 0,
      message: "",
      couleur: "",
      chargement: false
    };
  }

  componentDidUpdate() {
    //On a fait une demande de déplacement
    if (this.state.chargement) {
      this.envoiServeur();
    }
  }

  envoiServeur() {
    const { axe, valeur } = this.state;
    const valeurDep = parseInt(valeur);

    console.log("Envoi serveur deplacement");

    fetch(deplacementManuelUrl(axe, valeurDep))
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
    const { axe, valeur } = this.state;
    if (axe !== "" && valeur !== 0 && valeur !== "") {
      //Test validite
      const regexOnlyNumber = new RegExp("^-{0,1}[0-9]*$");
      if (regexOnlyNumber.test(valeur)) {
        //Tous les tests sont validés on envoie au serveur
        let newState = this.state;
        newState.chargement = true;
        this.setState(newState);
      }
    }
  }

  remiseZero(message, couleur) {
    const newState = {
      axe: "",
      valeur: 0,
      message: message,
      couleur: couleur,
      chargement: false
    };
    this.setState(newState);
  }

  affichage() {
    const axe = this.state.axe;
    const valeur = this.state.valeur;

    if (axe === "") {
      return <div />;
    }
    return (
      <p>
        Déplacement selon {axe} de : {valeur}
      </p>
    );
  }

  affichageResultat() {
    return <p style={{ color: this.state.couleur }}>{this.state.message}</p>;
  }

  affichageBouton() {
    if (this.state.axe === "") {
      return <div />;
    }
    if (this.state.chargement) {
      return (
        <Button variant="dark" block disabled>
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
        Déplacer
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
              <Col sm={6}>Axe de déplacement :</Col>
              <Col sm={{ span: 4, offset: 2 }}>
                <select
                  value={this.state.axe}
                  onChange={e => {
                    let ancienState = this.state;
                    ancienState.axe = e.target.value;
                    ancienState.message = "";
                    this.setState(ancienState);
                  }}
                >
                  <option value="">-- Sélectionner un axe --</option>
                  <option value="X">X</option>
                  <option value="Y">Y</option>
                  <option value="Z">Z</option>
                </select>
              </Col>
            </Row>
          </Form.Label>
          <br />
          <Form.Label>
            <Row noGutters>
              <Col sm={6}>Valeur de déplacement :</Col>
              <Col sm={{ span: 4, offset: 2 }}>
                <input
                  type="number"
                  value={this.state.valeur}
                  onChange={e => {
                    let ancienState = this.state;
                    ancienState.valeur = e.target.value;
                    ancienState.message = "";
                    this.setState(ancienState);
                  }}
                />
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
