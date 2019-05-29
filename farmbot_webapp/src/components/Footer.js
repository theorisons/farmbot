import React from "react";
import "./Footer.css";

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="separateur" />
        <p id="copyright">
          Copyright: Projet Farmbot{" "}
          <a
            rel="noopener noreferrer"
            href="http://phelma.grenoble-inp.fr/"
            target="_blank"
            title="Aller vers le site de Phelma"
            className="lienSite"
          >
            Phelma
          </a>
          <br />
          <br />
          - Membres -
          <br />
          <br />
          Thomas COUDERT
          <br />
          Paul MARGAIN
          <br />
          Jérémy NAVARRO
          <br />
          Matthieu SAUSSAYE
          <br />
          Marie VERLET
          <br />
          <br />
          - Encadrants -
          <br />
          <br />
          M. Aurélien KUHN
          <br />
          M. Nicolas RUTY
          <br />
          <br />
          - -
          <br />
          <br />
          Projet disponible sur{" "}
          <a
            rel="noopener noreferrer"
            href="https://github.com/theorisons/farmbot"
            target="_blank"
            title="Aller vers le code source"
            className="lienSite"
          >
            Github
          </a>{" "}
          2019
        </p>
      </footer>
    );
  }
}
