var express = require('express');

var bodyParser = require('body-parser');

var consign = require('consign');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

consign().include('rotas').into(app);

module.exports = app;