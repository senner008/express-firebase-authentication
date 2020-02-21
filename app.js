const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const validateEmail = require('validate-email-node-js');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const firebase = require("./firebaseClient.js")
const admin = require("./admin.js")

function validateCredentials (user, pass) {
  if (!user || !pass) return false;
  if (!validateEmail.validate(user)) return false;
  return true;
}

app.post('/login', async (req, res) => {

  const user = req.body.data.user;
  const pass = req.body.data.pass;

  try {
    if (!validateCredentials(user,pass)) {
      throw {message : "invalid credentials"};
    } 
    var authToken = await firebase.auth().signInWithEmailAndPassword(user, pass);
    res.json({
      token: authToken
    })
  } catch (err) {
    res.json({error: err})
  }
});

app.post('/auth', async (req, res) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    var token =  req.headers.authorization.split(' ')[1];
  }
  try {
    await admin.auth().verifyIdToken(token);
    res.json({body : "content received"});
  }
  catch (err) {
    res.json({body : "unauthorized!"});
  }
});

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

module.exports = app;
