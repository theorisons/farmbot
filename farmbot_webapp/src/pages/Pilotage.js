import React from "react";
import "./Pilotage.css";

import Carte from "../components/Carte";

import DeplacementLibre from "../components/DeplacementLibre";
import ValeurCapteur from "../components/ValeurCapteur";
import RetourMaison from "../components/RetourMaison";

const pilotages = [
  {
    titre: "Déplacement manuel du Farmbot",
    description:
      "Déplacer manuellement le Farmbot selon un axe avec une certaine valeur.",
    component: DeplacementLibre
  },
  {
    titre: "Retour maison",
    description: "Ramener le farmbot dans sa position de départ.",
    component: RetourMaison
  },
  {
    titre: "Prise de valeur de capteur",
    description: "Récupérer une information d'un capteur.",
    component: ValeurCapteur
  }
];

export default class Pilotage extends React.Component {
  affichageCartes() {
    let reponse = pilotages.map(el => (
      <Carte
        key={el.titre}
        titre={el.titre}
        description={el.description}
        component={el.component}
      />
    ));
    return reponse;
  }

  render() {
    return (
      <div>
        <h1 id="titrePilotage">Contrôle du Farmbot</h1>
        {this.affichageCartes()}
      </div>
    );
  }
}
