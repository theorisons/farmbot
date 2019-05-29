# coding=UTF8
import serial
import time as t 

from constantes import *

tempsAttente = 0

debut = t.time()
fin = t.time()

while (tempsAttente < TEMPS_ATTENTE_MAX):
    fin = t.time()
    tempsAttente = fin - debut
    print(tempsAttente)
print("OK " + str(TEMPS_ATTENTE_MAX))