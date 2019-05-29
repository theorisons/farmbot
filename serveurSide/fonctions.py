# coding=UTF8

## IMPORTATIONS

import serial
from flask import jsonify
import datetime

from constantes import *

## FONCTIONS COMMUNICATIONS

def envoiArduino(donnees, ser):
    #Envoi les données vers la carte Arduino via le port Série
  ser.write(donnees)

def receptionArduino(ser):
    #Réceptionne les données envoyé par la carte Arduino
  message = ""
  elmtRecu = "z" # N'importe quoi tant que pas début ou fin
  compteur = -1 # Pour ne pas lire en limite

  # Attente de la marque du début de données
  while  ord(elmtRecu) != MARQUE_DEBUT: 
    elmtRecu = ser.read()
  
  # Sauvegarde et lecture tant que l'on n'a pas atteint la fin de la données
  while ord(elmtRecu) != MARQUE_FIN:
    if ord(elmtRecu) != MARQUE_DEBUT:
      message = message + elmtRecu 
      compteur += 1
    elmtRecu = ser.read()
  
  return(message)


def attenteArduino(ser):
    # On attend que la carte Arduino soit prête à envoyer / recevoir des données
    # i.e. a fini son initialisation et envoyé 'Arduino est pret'
    # Si Arduino ne répond pas on renvoi une erreur
   
    message = ""

    while message.find("Arduino est pret") == -1:

        while ser.inWaiting() == 0:
            pass

        message = receptionArduino(ser)

        
def sequenceEnvoi(donnees):
    # Fonction permettant d'envoyer un message à l'Arduino et d'attendre sa réponse
    # Prend en parametre l'information à envoyer
    # Renvoi le message recu de la part de la carte Arduino

    ser = serial.Serial(PORT_SERIE, VITESSE_COMMUNICATION) #On définit nos paramètres de communications via le port série

    attenteArduino(ser) #On attend que l'Arduino soit prêt
    
    attenteReponse = False

    #On envoi les données
    envoiArduino(donnees, ser)
    attenteReponse = True

    if attenteReponse == True:
        #Nous avons envoyer des données
        #On attend confirmation de l'Arduino

        while ser.inWaiting() == 0:
            pass
        
        donneesRecu = receptionArduino(ser)
        attenteReponse = False
    
    ser.close   #On stop la communication via le port série

    return(donneesRecu)

def formatageMessage(listeElmt):
    # Cree une donnée qui peut etre envoyé et traité par la carte Arduino
    # i.e. "<listeElm[0],...,listeElmt[n]>"

    message = ""
    message = message + chr(MARQUE_DEBUT)

    for i in listeElmt:
        message = message + "{},".format(i)
    
    message = message[:-1] #On enlève la derniere virgule
    message = message + chr(MARQUE_FIN)

    return(message)


## FONCTIONS DIVERSES

def lireFichier():
    #Format :
    #NomCapteur Valeur Unite Date(jj/mm/yyyy) Heure(XXhXXmXXs)
    fichier = open("capteur.txt", "r")
    contenu = []
    
    for ligne in fichier:
        tempo = ligne
        tempo = tempo.rstrip("\n")
        tempo = tempo.split()
        contenu += [[tempo[0], tempo[1]+tempo[2], tempo[3] + ' - ' + tempo[4]]]
    
    fichier.close()
    return(contenu)

def ecrireFichier(capteur, valeur):
    fichier = open("capteur.txt", "r")

    lines = fichier.readlines()

    for i in range (len(lines)) :
        lines[i] = lines[i].split(" ")

    fichier.close()
    #print(lines)
    for i in lines:
        if (i[0] == capteur):
            i[1] = str(valeur)
            date = datetime.datetime.now()
            i[3] = "{}/{}/{}".format(date.day, date.month, date.year)
            i[4] = "{}h{}m{}s\n".format(date.hour, date.minute, date.second)


    tempo = lines
    for i in range (len(lines)) :
        tempo[i] = " ".join(lines[i])
    #print(tempo)

    fichier = open("capteur.txt", "w")
    fichier.writelines(tempo)
    fichier.close()


## FONCTIONS API

def retourMaison():
    pourArduino = formatageMessage(['M'])
    messageRecu = sequenceEnvoi(pourArduino)
    return(jsonify({"message" : "{}".format(messageRecu)}))

def capteur(capteurSelectionne):
    valeur = 18
    ecrireFichier(capteurSelectionne, valeur)
    return(jsonify({"message" : "Le capteur {} mesure {}.".format(capteurSelectionne, valeur)}))

def miseAJourDonnees():
    #Renvoi les données précédentes contenu dans le fichier texte
    liste = lireFichier()
    return(jsonify({"donnees" : liste}))

def deplacement(axe, valeur):
    valeur = int(valeur)
    if (valeur >0):
        pourArduino = formatageMessage([axe, '+', valeur])
        print(pourArduino)
        messageRecu = sequenceEnvoi(pourArduino)
    else:
        pourArduino = formatageMessage([axe, '-', -1*valeur])
        messageRecu = sequenceEnvoi(pourArduino)
    print("-- Reception --")
    print(messageRecu)
    return(jsonify({"message" : "{}".format(messageRecu)}))