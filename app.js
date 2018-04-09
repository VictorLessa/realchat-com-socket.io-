var app = require('./serve.js');

var servidor = app.listen(80, function(){
	console.log('servidor funcionando');
});

var io = require('socket.io').listen(servidor);

clientes = [{
	nick: 'escolha um amigo', idusuario:''
}];

mensagem = [];

room = {};
app.set('io', io);



io.on('connection', function(socket){


		socket.on('adduser', function(user){
			for(var i =0; i < clientes.length; i++){
				if(clientes[i].idusuario === user.idusuario){
					var cadastro = true;
					
				}
					
					
			} 
			if(cadastro){
						console.log('usuario existe');
					}else{
						clientes.push(user);
					}

		});


		/*pagina da lista de usuarios*/
		socket.on('lista', function(nick){
			console.log(nick);
			for(var i =0; i < clientes.length; i++){
				if(clientes[i].idusuario != nick.id){
					
					socket.emit('lista amg', {nomes: clientes[i].nick, id: clientes[i].idusuario});
				}	
			}
			//socket.emit('yournick', {id: nick.id});
		});

		/*=======*/
		/*recuperando a id do usuario com essa gambiarra *-* */
		socket.on('envaridpararoom', function(ids){
			
			msg =   ids.myid * ids.idamigo;
			socket.join(msg);
			room[ids.myid] = {
				'socket': socket.id
			};
			console.log(room);
			for(var i=0; i < mensagem.length; i++){
				if(mensagem[i].id == msg){
					//console.log(mensagem[i].msg);
					socket.emit('abrir',{
						msg: mensagem[i].msg,
						id: mensagem[i].id
						});

					}
			}
		});

		/*emitindo  a mensagem*/

		socket.on('msg privada',function(msg){
				
			msg.id = msg.idamigo * msg.myid;
			mensagem.push(msg);

			console.log(room[msg.idamigo].socket);
			socket.emit('add msg', msg);
			socket.to(msg.id).emit('add msg', msg);
		});

		socket.on('room', function(room){
			socket.join('room');
			console.log(socket.rooms);
		});
	});

