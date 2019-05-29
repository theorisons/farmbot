#coding:UTF-8

PORT_CONNEXION = "ttyACM0"
PORT_SERIE = "/dev/" + PORT_CONNEXION
VITESSE_COMMUNICATION = 9600

MARQUE_DEBUT = 60 #Début de données "<"
MARQUE_FIN = 62 #Fin de données ">"

TEMPS_ATTENTE_MAX = 5 #Temps attente max en seconde