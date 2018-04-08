module.exports.nick = function(app, req, res){
		var nick = req.body;

		req.assert('nick', 'tem que seleciona um nick').notEmpty();
		var erros = req.validationErrors();
		if(erros){

			res.send('nao foi possivel entrar pq ' + erros[0].msg);
			return ;
		}
	
			/*app.get('io').emit('lista');*/
		res.render('lista', {nick: nick});
	
}
