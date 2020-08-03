// initialize the admin SDK once here at the top level
const admin = require("firebase-admin");
admin.initializeApp();

// include our submodules so they'll be deployed
module.exports = {
  ...require("./website"),
  ...require("./inquisitor")
}