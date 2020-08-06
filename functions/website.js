const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");
const generator = require("generate-password");
const cors = require("cors")({ origin: true });

// initialize APIs once for all functions
sgMail.setApiKey(functions.config().sendgrid.key);

/*
 * all of the onCall functions should handle errors with https://firebase.google.com/docs/functions/callable#handle_errors
 * instead of just console.log/console.error, that way the app can get the error too
 */

// Sends an email to UPE along with a receipt to the sender
exports.contactForm = functions.https.onCall(async (data, context) => {
  // email from sender to UPE
  const contactEmail = {
    to: "upe@bu.edu",
    from: "upe@bu.edu",
    templateId: functions.config().sendgrid.template.contact.one,
    dynamic_template_data: {
      name: data.name,
      senderEmail: data.senderEmail,
      subject: data.subject,
      text: data.text,
    },
  };

  // receipt so sender knows their message got through
  const contactReceipt = {
    to: data.senderEmail,
    from: "upe@bu.edu",
    templateId: functions.config().sendgrid.template.contact.two,
    dynamic_template_data: {
      name: data.name,
      subject: data.subject,
    },
  };

  const sgPromises = [sgMail.send(contactEmail), sgMail.send(contactReceipt)];
  return Promise.all(sgPromises)
    .then(() => ({ success: true, msg: "Sent messages!" }))
    .catch((err) => {
      console.error(err);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to send emails through SendGrid!"
      );
    });
});

exports.sendEmailTemplate = functions.https.onCall((data, context) => {
  console.log(context);
  sgMail
    .send(data)
    .then((res) => ({
      success: true,
      res,
    }))
    .catch((error) => {
      console.error(error);
      return error;
    });
});
