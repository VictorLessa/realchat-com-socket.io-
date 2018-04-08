module.exports = function(app){
	app.get('/', function(req, res){
		res.render('index');
	});

	app.post('/lista', function(req, res){
		app.controller.login.nick(app, req, res);
	});
}