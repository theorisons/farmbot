import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/* Import des Pages */
import Accueil from "../pages/Accueil";
import APropos from "../pages/APropos";
import Camera from "../pages/Camera";
import Erreur404 from "../pages/Erreur404";
import Pilotage from "../pages/Pilotage";

/* Import des Components */
import Header from "../components/Header";
import Footer from "../components/Footer";

const routes = [
  { path: "/", component: Accueil, exact: true },
  { path: "/a_propos", component: APropos },
  {
    path: "/pilotage",
    component: Pilotage
  },
  {
    path: "/camera_en_direct",
    component: Camera
  }
];

export default function RouterPrincipal() {
  return (
    <Router>
      <div>
        <Switch>
          {routes.map(el => (
            <Route
              key={el.path}
              exact={el.exact}
              path={el.path}
              render={() => {
                const Component = el.component;
                return (
                  <div>
                    <Header />
                    <Component />
                    <Footer />
                  </div>
                );
              }}
            />
          ))}

          <Route
            render={() => (
              <div>
                <Header />
                <Erreur404 />
                <Footer />
              </div>
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}
