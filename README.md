# UPE Firebase Master Project
This repository is home to all of the Firebase Config Files for Storage & Firestore, alongside with all the Firebase Cloud Functions used by the different UPE applications. Rather than adding Firebase boilerplate to every app the needs to define its own functions, Storage or Firestore, they're maintained here in one place.

## Installation
The only prerequisite is [Node.Js](https://nodejs.org/en/). If you have that, just clone the repo, `cd` into the `functions` folder, and run `npm install`. If you haven't done so before, you'll also need to run `firebase login`, which will prompt you to login to a Google account that has permissions to use and modify the UPE Master Firebase project.

## Developing Functions
All functions should be written inside `/functions`, inside the appropriate file based on the application the function is for. Functions can be written either in JavaScript or Typescript. Unless you're writing a function that will be called outside of a UPE app and requires a public endpoint, make sure the function is a [callable function](https://firebase.google.com/docs/functions/callable) as opposed to an HTTP function. Callable functions have built in access to the auth context, making it easier to authorize the calling user than in an HTTP function. For more information, you ca check out the official documentation for [Firebase Functions](https://firebase.google.com/docs/functions).

## Testing Functions
Direct call functions can be tested using http requests from a service such as Postman, or using the included Firebase Emulator, for which more details can be found [here](https://firebase.google.com/docs/functions/local-emulator). Furthermore, the Firebase Emulator can also be used to test background trigger functions using things like Firestore & Authentication, you can find more details about testing functions interactively [here](https://firebase.google.com/docs/functions/local-shell).

**Make sure to always test your functions before deploying!** Also, for this repo, refrain from using `git commit -am`, and instead do your `git add` and `git commit` separately, as this will ensure the pre-commit hooks for linting and formatting run properly. 

## Deploying Functions
This repository automatically deploys functions on every successful push to master, however if you need to do it manually you can do so running `npm run deploy` inside `/functions`. Note however that for safety reasons, deleting functions can't happen automatically. If you remove a function and push, the deploy action will fail as it won't delete the removed functions. To fix this, delete them manually with `firebase functions:delete FUNCTION_NAME_HERE --region us-central1`.

## Monitoring Functions
Once deployed, you can monitor the use of your functions on the Firebase console. Each invocation of a function will result in several logs both on request and on completion, alongside with any other logs you put into your functions. To access this you can head over to the console by clicking [here](https://console.firebase.google.com/), selection UPE Master, then the Functions tab, and finally Logs.

Further details on how to encode and use logs can be found [here](https://firebase.google.com/docs/functions/writing-and-viewing-logs).

# Further Links
The reference library for Firebase Functions can be found [here](https://firebase.google.com/docs/reference/node/firebase.functions), and further examples can be found [here](https://github.com/firebase/functions-samples).