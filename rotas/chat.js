module.exports = function(app){
	app.post('/chat', function(req, res){
		var dados = req.body;

		res.render('room', {id: dados});
	});
}