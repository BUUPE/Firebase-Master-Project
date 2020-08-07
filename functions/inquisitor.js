const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { asyncForEach, exportCollection, isAdmin } = require("./util");

exports.exportInquisitorData = functions.https.onCall(async (data, context) => {
  if (!isAdmin(context)) return { error: "Unauthorized" };
  else return exportCollection("inquisitor");
});

exports.importInquisitorData = functions.https.onCall(async (data, context) => {
  if (!isAdmin(context)) return { error: "Unauthorized" };
  else
    return {
      success: true,
    };
});
