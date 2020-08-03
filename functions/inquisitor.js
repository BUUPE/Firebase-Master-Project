const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { asyncForEach, exportCollection } = require("./util");

exports.exportInquisitorData = functions.https.onCall(async (data, context) => {
  const user = await admin
    .firestore()
    .collection("users")
    .doc(context.auth.uid)
    .get()
    .then((snapshot) => snapshot.data());
  if (!user.roles.admin) return { error: "Unauthorized" };
  else return exportCollection("inquisitor");
});

exports.importInquisitorData = functions.https.onCall(async (data, context) => {
  const user = await admin
    .firestore()
    .collection("users")
    .doc(context.auth.uid)
    .get()
    .then((snapshot) => snapshot.data());
  if (!user.roles.admin) return { error: "Unauthorized" };

  return {
    success: true,
  };
});
