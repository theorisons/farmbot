import React from "react";
import "./Accueil.css";

import { Table, Button, Spinner } from "react-bootstrap";
import { miseAJourUrl } from "../fonctions/communicationsServeur";

export default class Accueil extends React.Component {
  constructor(props) {
    super(props);
    this.donnees = [];
    this.state = { chargement: true };
  }

  componentDidMount() {
    //Premiere fois que l'on arrive sur la page
    if (this.state.chargement) {
      this.majDonnees();
    }
  }

  componentDidUpdate() {
    //Si l'on veut recharger les données
    if (this.state.chargement) {
      this.majDonnees();
    }
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
      <Button variant="dark" block onClick={() => this.importDonnees()}>
        Charger les données
      </Button>
    );
  }

  importDonnees() {
    this.setState({ chargement: true });
  }

  majDonnees() {
    fetch(miseAJourUrl())
      .then(resultat => {
        return resultat.json();
      })
      .then(resultat => {
        this.sauvegarde(resultat.donnees);
      })
      .catch(error => {
        console.error("Probleme de communication");
        console.error(error);
      });
  }

  sauvegarde(valeur) {
    let donnees = valeur.map(el => (
      <tr key={el[0]}>
        <th>{el[0]}</th>
        <th>{el[1]}</th>
        <th>{el[2]}</th>
      </tr>
    ));
    this.donnees = donnees;
    this.setState({ chargement: false });
  }

  render() {
    return (
      <div id="mainContainerAccueil">
        <h1 id="titreAccueil">Accueil</h1>
        <Table hover variant="dark">
          <thead>
            <tr>
              <th>Capteur</th>
              <th>Valeur</th>
              <th>Mise à jour</th>
            </tr>
          </thead>
          <tbody>{this.donnees}</tbody>
        </Table>
        {this.affichageBouton()}
      </div>
    );
  }
}
