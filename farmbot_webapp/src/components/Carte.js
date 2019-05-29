import React from "react";
import "./Carte.css";

export default class Carte extends React.Component {
  render() {
    const { component: Component, titre, description } = this.props;
    return (
      <div id="mainContainerCarte">
        <div id="titreDescriptionCarte">
          <h1 id="titreCarte">{titre}</h1>
          <h3 id="descriptionCarte">{description}</h3>
        </div>
        <Component />
      </div>
    );
  }
}
