const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");
const { isAdmin } = require("./util");

// initialize APIs once for all functions
sgMail.setApiKey(functions.config().sendgrid.key);

exports.sendEmailTemplate = functions.https.onCall((data, context) => {
  if (!isAdmin(context)) return { error: "Unauthorized" };
  else return sgMail.send(data).catch((error) => ({ error }));
});

exports.sendApplicationReceipt = functions.https.onCall((data, context) => {
  const receipt = {
    to: data.email,
    from: "upe@bu.edu",
    templateId: "d-c33887e2f16542b3bf6587314fe26539",
    dynamicTemplateData: {
      firstName: data.firstName,
    },
  };

  return sgMail.send(data).catch((error) => ({ error }));
});
