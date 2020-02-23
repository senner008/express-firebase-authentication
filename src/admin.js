
const serviceAccount = require("../configs/node-express-auth-firebase.json");
const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://node-express-auth.firebaseio.com"
});

module.exports = admin;
  