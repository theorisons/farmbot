import React from "react";
import "./Erreur404.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Erreur404 extends React.Component {
  render() {
    return (
      <div id="erreur404Container">
        <h1 id="titreErreur404">Erreur 404</h1>
        <h3 id="sousTitreErreur404">Page inconnue</h3>

        <p id="texteErreur404">
          Il semblerait que vous naviguez en territoire inconnu ...
        </p>
        <FontAwesomeIcon
          icon="blind"
          id="personneMalvoyante"
          title="Personne marchant avec une canne blanche"
        />
      </div>
    );
  }
}
