#include "PololuDriver.h"
#include "Ramps.h"

/* Définitions de pin d'interruption */
const byte pinInterrupX = 2;
const byte pinInterrupY = 3;
const byte pinInterrupZ = 18;

const byte pinReactivationFinCourse = 19;

/*Booléen d'arrêt d'urgence de chaque axe*/
boolean arretUrgenceX = false;
boolean arretUrgenceY = false;
boolean arretUrgenceZ = false;

int val = 0;       //value for storing moisture value
int soilPin = A5;  //Declare a variable for the soil moisture sensor
int soilPower = 4; //Variable for Soil moisture Power
const byte taillemax = 20;
char ordre[taillemax];
const char startMarker = '<';
const char endMarker = '>';
byte bytesRecvd = 0;
boolean readInProgress = false;
boolean newDataFromPC = false;
char signe[taillemax] = {0};
char axe[taillemax] = {0};
int deplacement = 0;

int x = 16;     //pin pomp à eau
long int m = 0; //multiplicateur
long int i = 0; //boucle

Ramps ramps = Ramps();

void setup()
{
  Serial.begin(9600);
  pinMode(16, OUTPUT); // Place la pin 16 comme sortie
  // Indique au PC que l'Arduino est prêt

  /*Initialisation des interruptions*/
  pinMode(pinInterrupX, INPUT_PULLUP);
  pinMode(pinInterrupY, INPUT_PULLUP);
  pinMode(pinInterrupZ, INPUT_PULLUP);
  pinMode(pinReactivationFinCourse, INPUT_PULLUP);

  attachInterrupt(digitalPinToInterrupt(pinInterrupX), interruptX, FALLING);
  attachInterrupt(digitalPinToInterrupt(pinInterrupY), interruptY, FALLING);
  attachInterrupt(digitalPinToInterrupt(pinInterrupZ), interruptZ, FALLING);
  attachInterrupt(digitalPinToInterrupt(pinReactivationFinCourse), reactivationFinCourse, FALLING);

  /*Fin init Interruption*/

  Serial.println("<Arduino est pret>"); // l'Arduino est prêt à recevoir et envoyer des infos à la rasp
}

void loop()
{
  getDataFromPC();
  activermoteurX();
  activermoteurY();
  activermoteurZ();
  hygro();
  misegraine();
  replyToPC();
}

void getDataFromPC()
{

  // receive data from PC and save it into ordre

  if (Serial.available() > 0)
  {

    char x = Serial.read();

    // the order of these IF clauses is significant

    if (x == endMarker)
    {
      readInProgress = false;
      newDataFromPC = true;
      parseData();
    }

    if (readInProgress)
    {
      ordre[bytesRecvd] = x;
      bytesRecvd++;
      if (bytesRecvd == taillemax)
      {
        bytesRecvd = taillemax - 1;
      }
    }

    if (x == startMarker)
    {
      bytesRecvd = 0;
      readInProgress = true;
    }
  }
}

//=============

void parseData()
{

  // split the data into its parts

  char *strtokIndx; // this is used by strtok() as an index

  strtokIndx = strtok(ordre, ","); // get the first part - the string
  strcpy(axe, strtokIndx);         // copy it to axe

  strtokIndx = strtok(NULL, ","); // this continues where the previous call left off
  strcpy(signe, strtokIndx);      // convert this part to an integer

  strtokIndx = strtok(NULL, ","); // this continues where the previous call left off
  deplacement = atoi(strtokIndx); // convert this part to an integer
}

//=============

void replyToPC()
{

  if (newDataFromPC)
  {
    if (!arretUrgenceX && !arretUrgenceY && !arretUrgenceZ)
    { //Le déplacement s'est bien déroulé
      Serial.print("<Deplacement axe ");
      Serial.print(axe);
      Serial.print(" de ");
      Serial.print(signe);
      Serial.print(deplacement);
      Serial.println(". OK.>");
      newDataFromPC = false;
      delay(200);
    }
    else
    { //Le système a touché un capteur fin de course
      Serial.print("<Capteur fin de course enclenche, reactiver le systeme manuellement.>");
      newDataFromPC = false;
      delay(200);
    }
  }
}

//============
void activermoteurZ()
{
  if (newDataFromPC && axe[0] == 90)
  { //Z
    ramps.motorZ.setDir(1);
    if (signe[0] == 45)
    {
      ramps.motorZ.setDir(-1);
    }
    delay(200);
    for (i = 0; i < deplacement; i++)
    {
      for (int v = 0; v < 1000; v++)
      {
        if (!arretUrgenceZ)
        {
          ramps.motorZ.stepOn();
          delayMicroseconds(50);
          ramps.motorZ.stepOff();
        }
      }
    }
  }
}
//============
void activermoteurY()
{
  if (newDataFromPC && axe[0] == 89)
  { //Y
    ramps.motorY.setDir(1);
    if (signe[0] == 45)
    {
      ramps.motorY.setDir(-1);
    }
    delay(200);
    for (i = 0; i < deplacement; i++)
    {
      for (int v = 0; v < 1000; v++)
      {
        if (!arretUrgenceY)
        {
          ramps.motorY.stepOn();
          delayMicroseconds(50);
          ramps.motorY.stepOff();
        }
      }
    }
  }
}

//=========
void activermoteurX()
{
  if (newDataFromPC && axe[0] == 88)
  { //X
    ramps.motorX.setDir(1);
    if (signe[0] == 45)
    {
      ramps.motorX.setDir(-1);
    }
    delay(200);
    for (i = 0; i < deplacement; i++)
    {
      for (int v = 0; v < 1000; v++)
      {
        if (!arretUrgenceX)
        {
          ramps.motorX.stepOn();
          delayMicroseconds(50);
          ramps.motorX.stepOff();
        }
      }
    }
  }
}

/*Fonction d'interruption*/
void interruptX()
{
  if (!arretUrgenceX)
  {
    arretUrgenceX = true;
  }
}

void interruptY()
{
  if (!arretUrgenceY)
  {
    arretUrgenceY = true;
  }
}

void interruptZ()
{
  if (!arretUrgenceZ)
  {
    arretUrgenceZ = true;
  }
}

void reactivationFinCourse()
{
  arretUrgenceX = false;
  arretUrgenceY = false;
  arretUrgenceZ = false;
}

//========
void misegraine()
{
  if (newDataFromPC && axe[0] == 77)
  {                         //M
    digitalWrite(16, HIGH); // active pin 16
    delay(3000);            //
    digitalWrite(16, LOW);  // desactive pine 16
  }
}
//==========
void hygro()
{
  if (newDataFromPC && axe[0] == 72)
  {                                    //H
    digitalWrite(soilPower, HIGH);     //met D7 "On"
    delay(10);                         //wait 10 milliseconds
    deplacement = analogRead(soilPin); //lis la valeur du signal
    digitalWrite(soilPower, LOW);      //met D7 "Off"
  }
}
