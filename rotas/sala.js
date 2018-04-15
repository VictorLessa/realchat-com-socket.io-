module.exports = (app)=>{
    app.get('/', (req, res)=>{
    	res.render('index');
    });
    app.post('/chat', (req, res)=>{
    	var dados = req.body;
   
    	for(var i = 0; i < user.length; i++){
    		if(user[i].senha == dados.senha && user[i].nome == dados.nome){

    			res.render('sala', {
    				yourdados:dados, 
					amigos: user,
					nomeamigo:'',
					meuid: user[i].id,
					idamigo: '',
					autorizado: ''				
    			});
    		}
    	}
    	res.render('index');
	});
	app.post('/action', (req, res)=>{
		var dados_do_amigo = req.body;
		for(var i = 0; i < user.length; i++){
			if(user[i].id == dados_do_amigo.id){

			res.render('sala',{
				yourdados: dados_do_amigo,
				idamigo: dados_do_amigo.id,
				nomeamigo: user[i].nome,
				meuid: dados_do_amigo.meuid,
				autorizado: true
			});
			}
		}
		
	});
    app.get('/sala', (req, res)=>{
        res.render('sala');
    });
} 