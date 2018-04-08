var express = require('express');

var bodyParser = require('body-parser');

var expressValidator = require('express-validator');

var consign = require('consign');
var app = express();

/*configurar o ejs como engine de views*/
app.set('view engine', 'ejs');
app.set('views', './views');

/*middleware*/
app.use(express.static('./paginas/public'));

/*middleware body-parser*/
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
/*configurar o middleware express validator*/
app.use(expressValidator());

/*configurar o consign*/
consign()
.include('rotas')
.then('models')
.then('controller')
.into(app);


module.exports = app;