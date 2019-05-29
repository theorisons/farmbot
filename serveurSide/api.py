# coding=UTF8
from flask import Flask
from flask_cors import CORS

import fonctions as f

app = Flask(__name__)
CORS(app)


@app.route("/")

def home() :
    return("""<div>
                <h1>Serveur Web !</h1>
                <p>Accès à l'API par /api</p
              </div>""")

@app.route("/api/deplacement_manuel/<axe>/<valeur>", methods=["GET"])
def deplacement_manuel(axe, valeur):
    renvoi = f.deplacement(axe, valeur)
    return(renvoi)


@app.route("/api/retour_maison", methods=["GET"])
def retour_maison():
    renvoi = f.retourMaison()
    return(renvoi)

@app.route("/api/mise_a_jour", methods=["GET"])
def mise_a_jour():
    renvoi = f.miseAJourDonnees()
    return(renvoi)

@app.route("/api/capteur/<capteurSelectionne>", methods=["GET"])
def priseCapteur(capteurSelectionne):
    renvoi = f.capteur(capteurSelectionne)
    return(renvoi)
    

app.run(host='10.3.141.1')
