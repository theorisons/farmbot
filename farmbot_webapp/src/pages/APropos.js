import React from "react";
import "./APropos.css";

export default class APropos extends React.Component {
  render() {
    return (
      <div id="mainContainerAPropos">
        <h1 id="titreAPropos">À Propos</h1>

        <h3 className="sousTitreAPropos">L'histoire du Farmbot</h3>

        <p className="paragrapheAPropos">
          Le farmbot est un projet open-source d'automatisation d'un potager.
          Son développement débute en 2011 avec au commande un ingénieur
          Californien.
        </p>

        <h3 className="sousTitreAPropos">Notre vision du Farmbot</h3>

        <p className="paragrapheAPropos">
          En 2019 cinq élèves ingénieurs en première année dans l'école{" "}
          <a
            rel="noopener noreferrer"
            href="http://phelma.grenoble-inp.fr/"
            target="_blank"
            title="Aller vers le site de Phelma"
            className="lienSite"
          >
            Phelma
          </a>{" "}
          on pour objectif de concevoir un farmbot.
          <br />
          Cependant pour maîtriser toute la technologique, ils décident de
          concevoir une nouvelle structure et d'amplémenter tout le code
          informatique.
        </p>

        <h3 className="sousTitreAPropos">Evolution du projet</h3>

        <p className="paragrapheAPropos">
          Débuter en ...
          <br />
          Photo de l'avancement.
        </p>
      </div>
    );
  }
}
