//library
const express = require('express');
const path = require('path');
const Promise = require('bluebird');

//Server Init
const app = express();
const port = 4033;
const dbManager = require('./database/dbManager.js');


//middleware import and activation
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//api endpoints



//serve static files
app.get('*/index.js', (req, res) => {
  res.sendFile(path.join(__dirname,'..','public','index.js'));
})

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname,'..','public','index.html'));
})


module.exports = {app, port};
