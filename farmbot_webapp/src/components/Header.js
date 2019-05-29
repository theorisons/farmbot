import React from "react";
import "./Header.css";

import { Navbar, Nav, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";

import { NOM_SITE, MENU_NAVIGATION } from "../helpers/constantes";

export default class Header extends React.Component {
  afficheMenu = () => {
    let reponse = MENU_NAVIGATION.map(el => (
      <Col key={el.nom}>
        <Nav.Link
          as={Link}
          to={el.path}
          title={el.title}
          className="itemsNavigation"
        >
          {el.nom}
        </Nav.Link>
      </Col>
    ));
    return reponse;
  };

  render() {
    return (
      <header>
        <Navbar expand="sm" bg="dark" variant="dark">
          <Link to="/" title="Retour à l'accueil">
            <Navbar.Brand>
              <FontAwesomeIcon icon="carrot" id="logoBrand" />
            </Navbar.Brand>
          </Link>
          <Link to="/" title="Retour à l'accueil">
            <Navbar.Brand id="textBrand">{NOM_SITE}</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            <Nav>
              <Row noGutters id="navigationHeader">
                {this.afficheMenu()}
              </Row>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="separateur" />
      </header>
    );
  }
}
