const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();
const port = 3000

app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const admin = require("./admin.js")

app.post('/auth', async (req, res) => {
  var token;
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    token =  req.headers.authorization.split(' ')[1];
  }
  try {
    await admin.auth().verifyIdToken(token);
    res.json({body : "private content"});
  }
  catch (err) {
    res.status(401);
    res.send(err);
  }
});

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


