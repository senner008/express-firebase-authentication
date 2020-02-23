
const serviceAccount = require("../configs/private-admin-key.json");
const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://node-express-auth.firebaseio.com"
});

module.exports = admin;
  