const ip = "10.3.141.1";
const url = `http://${ip}:5000/api`;

export const deplacementManuelUrl = (axe, valeur) => {
  const spec = "/deplacement_manuel/";
  return url + spec + axe + "/" + valeur;
};

export const mesureCapteurUrl = capteur => {
  const spec = "/capteur/";
  return url + spec + capteur;
};

export const miseAJourUrl = () => {
  const spec = "/mise_a_jour";
  return url + spec;
};

export const retourMaisonUrl = () => {
  const spec = "/retour_maison";
  return url + spec;
};

export const fluxVideoUrl = () => {
  const urlCamera = `http://${ip}:8081`;
  return urlCamera;
};
