# UPE Firebase Functions
This repository is home to all the Firebase Cloud Functions used by the different UPE applications. Having this central rep. allows us to more easily share functions between applications without having to update each of the individual code bases.

The functions here included are all in JS, however Typescript is also allowed by Firebase.

# Start Guide

## Installation
In order to work on this repository you must first have the following installed:

- [Node.Js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)

In addition, make sure the Node version on your computer is Node 12, as this is the version that the functions will be running on in Firebase.

## Setup
Setting up this repository is quite simple, begin by cloning the rep using `git clone https://github.com/BUUPE/Firebase-Functions`, then `cd Firebase-Functions` to get into the proper folder.

From here, run `yarn` to get all of the dependencies required to run the project, followed by `cd functions` and `yarn` yet again to download the dependencies that are directly configured for the functions themselves.

With that done, you can now navigate back to the base route, and run `firebase login`, this will prompt you to login to a google account that has permissions to use and modify the UPE Firebase Master project.

# Coding Guide

## Developing Functions
All functions should be coded & developed inside the `functions/index.js`, and should be either in valid JavaScript or Typescript.

With that said, the official documentation for Firebase Functions can be found [here](https://firebase.google.com/docs/functions). A couple of key things to keep in mind are the types of functions, Firebase helpfully provides two distinct types of functions, direct call ones (onCall & onRequest), and background trigger functions which are tied with other Firebase services such as Auth or Firestore.

Example functions for things such as SendGrid emails or Database fetching can be found inside the `index.js` file already.

## Testing Functions
Direct call functions can be tested using http requests from a service such as Postman, or using the included Firebase Emulator, for which more details can be found [here](https://firebase.google.com/docs/functions/local-emulator).

Furthermore, the Firebase Emulator can also be used to test background trigger functions using things like Firestore & Authentication, you can find more details about testing functions interactively [here](https://firebase.google.com/docs/functions/local-shell).

## Deploying Functions
Once you have finished developing and testing your functions you can deploy them to Firebase for official use by using the `firebase deploy --only functions` command on the route folder of the project.

While deploying the functions you will be prompted if there are any errors or issues with them, and should correct them prior to officially deploying them.

## Monitoring Functions
Once deployed, you can monitor the use of your functions on the Firebase console. Each invocation of a function will result in several logs both on request and on completion, alongside with any other logs you put into your functions. To access this you can head over to the console by clicking [here](https://console.firebase.google.com/), selection UPE Master, then the Functions tab, and finally Logs.

Further details on how to encode and use logs can be found [here](https://firebase.google.com/docs/functions/writing-and-viewing-logs).

# Further Links
The reference library for Firebase Functions can be found [here](https://firebase.google.com/docs/reference/node/firebase.functions), and further examples can be found [here](https://github.com/firebase/functions-samples).