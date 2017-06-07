//const express = require('express');

module.exports = io.sockets.on('connection', function(socket){

    socket.on('new user', function(data, callback){ //fornt end te lodin shto metode per emit userin
        if(data in userss){
            callback(false);
        }
        else
        {
            callback(true);
            socket.nickname = data;
            console.log(socket.nickname);
            userss[socket.nickname] = socket;
            updateNicknames();
        }
    });

    function updateNicknames(){
        io.sockets.emit('usernames', Object.keys(userss));
    }

    socket.on('send message', function(data, name, callback){
       // console.log(typeof data);
        var msg = data.trim();

         if(name in userss)
         {
            console.log(name +"send");
            userss[name].emit('whisper', {msg: msg, nick: socket.nickname});
         }
         else
         {

         }
        //io.sockets.emit('new message', {msg: data, nick: socket.nickname});
    });

    socket.on('disconnect', function(data){
        if(!socket.nickname) return;
        delete userss[socket.nickname];
        updateNicknames();
    });
});