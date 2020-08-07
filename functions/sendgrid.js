const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");

// initialize APIs once for all functions
sgMail.setApiKey(functions.config().sendgrid.key);

exports.sendEmailTemplate = functions.https.onCall((data, context) => {
  console.log(context);
  return context;
  /*sgMail
    .send(data)
    .then((res) => ({
      success: true,
      res,
    }))
    .catch((error) => {
      console.error(error);
      return error;
    });*/
});
