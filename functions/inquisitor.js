const functions = require("firebase-functions");
const { asyncForEach, exportCollection, isAdmin } = require("./util");

exports.exportInquisitorData = functions.https.onCall(async (data, context) => {
  if (!isAdmin(context))
    throw new functions.https.HttpsError(
      "permission-denied",
      "You must be an admin to call this function!"
    );
  else return exportCollection("inquisitor");
});

exports.importInquisitorData = functions.https.onCall(async (data, context) => {
  if (!isAdmin(context))
    throw new functions.https.HttpsError(
      "permission-denied",
      "You must be an admin to call this function!"
    );
  else
    return {
      success: true,
    };
});
