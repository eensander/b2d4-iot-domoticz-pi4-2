# b2d4-iot-domoticz

## Description

An alternative implementation of Zuyd's [IoT_WindowsFormsExamples](https://github.com/ZuydUniversity/B2D4_Voorbeelden/tree/master/IoT_WindowsFormsExamples) using [VueJS](https://vuejs.org/) with [TypeScript](https://www.typescriptlang.org/).

# Installation
## Clone the repository
```
git clone https://github.com/eensander/b2d4-iot-domoticz-pi4-2.git
```
## Navigate into the project folder
```
cd b2d4-iot-domoticz-pi4-2
```

## Install the required dependencies
```
npm install
```

## Start the web service
```
npm run serve
```

## Importing the database
Start domoticz, navigate to 
```
Setup -> Settings -> Backup/restore
```
Click Restore Database and select Domoticz.db

# Usage

At this point you can go to localhost:8080 (or whatever port Domoticz is set to run on) to view the lamps, and localhost:8081 for the Verstopapplicatie.
