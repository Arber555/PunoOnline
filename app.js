const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
//
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const port = process.env.PORT || 3000;


// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', function() {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});



const users = require('./routes/users');
const profiles =require('./routes/profiles'); 
const professions = require('./routes/professions');
const categorys = require('./routes/categorys');
const portfolios = require('./routes/portfolios');
const projects = require('./routes/projects');
const vlersimet = require('./routes/vlersimet');
const ofertat = require('./routes/ofertat');
const kontratatvirtuale = require('./routes/kontratatvirtuale');
const test = require('./routes/test');

//chati
//const chat = require(./chat/chat);

//Port Number
//const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json({limit: '50mb'})); //e ka mbishkru default limitin e dergimit http://stackoverflow.com/questions/19917401/error-request-entity-too-large
app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); //e ka mbishkru default limitin e dergimit http://stackoverflow.com/questions/19917401/error-request-entity-too-large

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/profiles', profiles);
app.use('/professions', professions);
app.use('/categorys', categorys);
app.use('/portfolios', portfolios);
app.use('/projects', projects);
app.use('/vlersimet', vlersimet);
app.use('/ofertat', ofertat);
app.use('/kontratatvirtuale', kontratatvirtuale);
app.use('/test', test);

app.get('/', function(req, res){
  res.send("aaaa");
})

//start server
server.listen(port, function(){
  console.log('Server started on port '+port);
});




//chat

const userss = {};
const connections = [];

app.get('/chat', function(req, res, next){
    res.sendfile(__dirname + '/chat.html');
})

io.sockets.on('connection', function(socket){

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

//chat u kry




//coment testues per git push asdsdasd