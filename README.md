# b2d4-iot-domoticz

## Description

An alternative implementation of Zuyd's [IoT_WindowsFormsExamples](https://github.com/ZuydUniversity/B2D4_Voorbeelden/tree/master/IoT_WindowsFormsExamples) using [VueJS](https://vuejs.org/) with [TypeScript](https://www.typescriptlang.org/).

Currently, only the _On_ and _Off_ switch-buttons and the 'Wait 5 Method' button work.

![Screenshot](https://i.imgur.com/UuOS1qD.png)

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
Click the button
```
Restore Database
```
And select Domoticz.db

# Usage

At this point you can go to localhost:8080 (or whatever port Domoticz is set to run on) to 
