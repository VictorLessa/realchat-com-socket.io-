var app = require('./server');

var servidor = app.listen(3000, ()=>{
    console.log('funcionando');
});

user = [
{nome: 'victor', senha: '123', id: '147'},
{nome: 'edson', senha: '1103', id: '159'},
{nome: 'gabriel', senha: '11031998', id: '123'}
];

mensagem = [];
var io = require('socket.io').listen(servidor);

app.set('io', io);

io.on('connection', (socket)=>{
    console.log('entrou');

    socket.on('carregar amigos', (yourdados)=>{
        for(var i = 0; i < user.length; i++){
            if(user[i].senha != yourdados.mysenha && user[i].nome != yourdados.mynome){
                socket.emit('lista de amigos', {nome: user[i].nome, id: user[i].id});
            }else{
                
            }
        }
    });  
    socket.on('gerar room', (room)=>{
        ids = room.meuid * room.idamigo;
        console.log(ids);
        socket.join(ids);
    });
    socket.on('carregar', (ids)=>{
        idmsg = ids.idamigo * ids.meuid;
        for(var i = 0; i < mensagem.length; i++){
            if(idmsg == mensagem[i].id){
                
                socket.emit('load msg', {
                    msg:mensagem[i].msg,
                    meuid:mensagem[i].meuid,
                    idamigo:mensagem[i].idamigo
                });
            }
        }
    });
    socket.on('salvar msg', (msg)=>{
        msg.id = msg.idamigo * msg.meuid;
        socket.to(msg.id).emit('add msg', {msg: msg.msg,
        meuid: msg.meuid
        });
        mensagem.push(msg);
        console.log(mensagem);
    }); 
});
