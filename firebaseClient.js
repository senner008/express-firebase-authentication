const firebase = require('firebase');
const config = require('./configs/client-config.js');
firebase.initializeApp(config); 

module.exports = firebase;