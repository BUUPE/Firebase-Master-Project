const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");
const { isAdmin, validEmail } = require("./util");

// initialize APIs once for all functions
sgMail.setApiKey(functions.config().sendgrid.key);

exports.sendEmailTemplate = functions.https.onCall((data, context) => {
  if (!isAdmin(context))
    throw new functions.https.HttpsError(
      "permission-denied",
      "You must be an admin to call this function!"
    );
  else
    return sgMail.send(data).catch((error) => {
      console.error(error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to send email through SendGrid!"
      );
    });
});

exports.applicantFinalAccepted = functions.https.onCall((data, context) => {
  if (!validEmail(data.email))
    throw new functions.https.HttpsError(
      "invalid-argument",
      'The "email" field must be a valid email!'
    );
  if (typeof data.name !== "string")
    throw new functions.https.HttpsError(
      "invalid-argument",
      'The "name" field must be a string!'
    );

  const mailData = {
    to: data.email,
    from: "BU UPE <upe@bu.edu>",
    templateId: "d-6bd8bb2ad44d4efdbd7a9c0d985a85cc",
    dynamicTemplateData: {
      name: data.name,
    },
  };

  return sgMail.send(mailData).catch((error) => {
    console.error(error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to send email through SendGrid!"
    );
  });
});

exports.applicantAccepted = functions.https.onCall((data, context) => {
  if (!validEmail(data.email))
    throw new functions.https.HttpsError(
      "invalid-argument",
      'The "email" field must be a valid email!'
    );
  if (typeof data.name !== "string")
    throw new functions.https.HttpsError(
      "invalid-argument",
      'The "name" field must be a string!'
    );

  const mailData = {
    to: data.email,
    from: "BU UPE <upe@bu.edu>",
    templateId: "d-a58eeaa051d743a2a77a4385cdaa90e6",
    dynamicTemplateData: {
      name: data.name,
    },
  };

  return sgMail.send(mailData).catch((error) => {
    console.error(error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to send email through SendGrid!"
    );
  });
});

exports.applicantDenied = functions.https.onCall((data, context) => {
  if (!validEmail(data.email))
    throw new functions.https.HttpsError(
      "invalid-argument",
      'The "email" field must be a valid email!'
    );
  if (typeof data.name !== "string")
    throw new functions.https.HttpsError(
      "invalid-argument",
      'The "name" field must be a string!'
    );
  if (typeof data.feedback !== "string")
    throw new functions.https.HttpsError(
      "invalid-argument",
      'The "feedback" field must be a string!'
    );

  const mailData = {
    to: data.email,
    from: "BU UPE <upe@bu.edu>",
    templateId: "d-ae7de586f35849ad9e1e67c29ca47858",
    dynamicTemplateData: {
      name: data.name,
      feedback: data.feedback,
    },
  };

  return sgMail.send(mailData).catch((error) => {
    console.error(error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to send email through SendGrid!"
    );
  });
});

exports.sendApplicationReceipt = functions.https.onCall((data, context) => {
  if (!validEmail(data.email))
    throw new functions.https.HttpsError(
      "invalid-argument",
      'The "email" field must be a valid email!'
    );
  if (typeof data.firstName !== "string")
    throw new functions.https.HttpsError(
      "invalid-argument",
      'The "firstName" field must be a string!'
    );

  const receipt = {
    to: data.email,
    from: "BU UPE <upe@bu.edu>",
    templateId: "d-c33887e2f16542b3bf6587314fe26539",
    dynamicTemplateData: {
      firstName: data.firstName,
    },
  };

  return sgMail.send(receipt).catch((error) => {
    console.error(error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to send email through SendGrid!"
    );
  });
});

exports.applicantTimeslotsOpen = functions.https.onCall(
  async (data, context) => {
    if (!isAdmin(context))
      throw new functions.https.HttpsError(
        "permission-denied",
        "You must be an admin to call this function!"
      );
    else {
      const applicants = await admin
        .firestore()
        .collection("users")
        .where("roles.applicant", "==", true)
        .get()
        .then((snapshot) => snapshot.docs.map((doc) => doc.data()));

      const emails = applicants.map((applicant) => ({
        to: applicant.email,
        from: "BU UPE <upe@bu.edu>",
        templateId: "d-fa081298b5de4a868b6a162a800ad47d",
        dynamicTemplateData: {
          firstName: applicant.name.split(" ")[0],
        },
      }));

      return sgMail.send(emails).catch((error) => {
        console.error(error);
        throw new functions.https.HttpsError(
          "internal",
          "Failed to send emails through SendGrid!"
        );
      });
    }
  }
);

exports.interviewerTimeslotsOpen = functions.https.onCall(
  async (data, context) => {
    if (!isAdmin(context))
      throw new functions.https.HttpsError(
        "permission-denied",
        "You must be an admin to call this function!"
      );
    else {
      const interviewers = await admin
        .firestore()
        .collection("users")
        .where("roles.recruitmentteam", "==", true)
        .get()
        .then((snapshot) => snapshot.docs.map((doc) => doc.data()));

      const emails = interviewers.map((interviewer) => ({
        to: interviewer.email,
        from: "BU UPE <upe@bu.edu>",
        templateId: "d-f4599164dc254b4e8eec5edc66555a01",
        dynamicTemplateData: {
          firstName: interviewer.name.split(" ")[0],
        },
      }));

      return sgMail.send(emails).catch((error) => {
        console.error(error);
        throw new functions.https.HttpsError(
          "internal",
          "Failed to send emails through SendGrid!"
        );
      });
    }
  }
);

exports.timeslotSelected = functions.https.onCall((data, context) => {
  if (!validEmail(data.email))
    throw new functions.https.HttpsError(
      "invalid-argument",
      'The "email" field must be a valid email!'
    );
  if (typeof data.firstName !== "string")
    throw new functions.https.HttpsError(
      "invalid-argument",
      'The "firstName" field must be a string!'
    );
  if (typeof data.time !== "string")
    throw new functions.https.HttpsError(
      "invalid-argument",
      'The "time" field must be a string!'
    );

  const receipt = {
    to: data.email,
    from: "BU UPE <upe@bu.edu>",
    templateId: "d-385e25b7779748d8b4d3ab03f03cb15b",
    dynamicTemplateData: {
      firstName: data.firstName,
      time: data.time,
    },
  };

  return sgMail.send(receipt).catch((error) => {
    console.error(error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to send email through SendGrid!"
    );
  });
});
exports.timeslotUnselected = functions.https.onCall((data, context) => {
  if (!validEmail(data.email))
    throw new functions.https.HttpsError(
      "invalid-argument",
      'The "email" field must be a valid email!'
    );
  if (typeof data.firstName !== "string")
    throw new functions.https.HttpsError(
      "invalid-argument",
      'The "firstName" field must be a string!'
    );

  const receipt = {
    to: data.email,
    from: "BU UPE <upe@bu.edu>",
    templateId: "d-3ad6c20e9cc946c5ad767729b097a75c",
    dynamicTemplateData: {
      firstName: data.firstName,
    },
  };

  return sgMail.send(receipt).catch((error) => {
    console.error(error);
    throw new functions.https.HttpsError(
      "internal",
      "Failed to send email through SendGrid!"
    );
  });
});

exports.interviewerTimeslotsOpen = functions.https.onCall(
  async (data, context) => {
    if (!isAdmin(context))
      throw new functions.https.HttpsError(
        "permission-denied",
        "You must be an admin to call this function!"
      );
    else {
      const interviewers = await admin
        .firestore()
        .collection("users")
        .where("roles.upemember", "==", false)
        .where("roles.applicant", "==", false)
        .get()
        .then((snapshot) => snapshot.docs.map((doc) => doc.data()));

      const emails = interviewers.map((interviewer) => ({
        to: interviewer.email,
        from: "BU UPE <upe@bu.edu>",
        templateId: "d-f4599164dc254b4e8eec5edc66555a01",
        dynamicTemplateData: {
          firstName: interviewer.name.split(" ")[0],
        },
      }));

      return sgMail.send(emails).catch((error) => {
        console.error(error);
        throw new functions.https.HttpsError(
          "internal",
          "Failed to send emails through SendGrid!"
        );
      });
    }
  }
);
