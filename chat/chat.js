users = {};
connections = [];

/*app.get('/', function(req, res, next){
    res.sendFile(__dirname + '/index.html');
})*/

io.sockets.on('connection', function(socket){

    socket.on('new user', function(data, callback){
        if(data in users){
            callback(false);
        }
        else
        {
            callback(true);
            socket.nickname = data;
            users[socket.nickname] = socket;
            updateNicknames();
        }
    });

    function updateNicknames(){
        io.sockets.emit('usernames', Object.keys(users));
    }

    socket.on('send message', function(data, name, callback){
        var msg = data.trim();

         if(name in users)
         {
            users[name].emit('whisper', {msg: msg, nick: socket.nickname});
         }
         else
         {

         }
        //io.sockets.emit('new message', {msg: data, nick: socket.nickname});
    });

    socket.on('disconnect', function(data){
        if(!socket.nickname) return;
        delete users[socket.nickname];
        updateNicknames();
    });

    //codi vjeter osht posht

    //connections.push(socket);
    /*connections[socket.id] = {username: socket.username, socket: socket};
    console.log('connections '+ connections.length);

    socket.on("disconnect", function(data){
        users.splice(users.indexOf(socket.username), 1);
        updateUsernames();
        connections.splice(connections.indexOf(socket), 1);
        console.log('disconnect '+ connections.length);
    });
    
    socket.on('send message', function(data){
        console.log(data);
        io.sockets.emit('new message', {msg: data, user: socket.username});
    });

    socket.on('new user', function(data ,callback){
        callback(true);
        socket.username = data;
        users[socket.username] = socket.id;
        //users.push(socket.username);
        updateUsernames();
    });


    //u shtu
    socket.on('private message', function(to, message){
        console.log(connections[users[to]]);
        io.connections[users[to]].socket.emit('new message', {message: message, user: connections[users[to]].username});
    });

    function updateUsernames(){
        io.sockets.emit('get users', users);
    }*/
});