import React from "react";

import { Form, Button, Spinner } from "react-bootstrap";
import { retourMaisonUrl } from "../fonctions/communicationsServeur";

export default class RetourMaison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    console.log("Envoi serveur retour Maison");

    fetch(retourMaisonUrl())
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
    let newState = this.state;
    newState.chargement = true;
    this.setState(newState);
  }

  remiseZero(message, couleur) {
    const newState = {
      message: message,
      couleur: couleur,
      chargement: false
    };
    this.setState(newState);
  }

  affichageResultat() {
    return <p style={{ color: this.state.couleur }}>{this.state.message}</p>;
  }

  affichageBouton() {
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
        Démarrer
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
            {this.affichageResultat()}
            {this.affichageBouton()}
          </Form.Label>
        </Form>
      </div>
    );
  }
}
