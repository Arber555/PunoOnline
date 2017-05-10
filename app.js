const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

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

const app = express();

const users = require('./routes/users');
const profiles =require('./routes/profiles'); 
const professions = require('./routes/professions');
const categorys = require('./routes/categorys');
const portfolios = require('./routes/portfolios');
const projects = require('./routes/projects');
const vlersimet = require('./routes/vlersimet');
const ofertat = require('./routes/ofertat');
const kontratatvirtuale = require('./routes/kontratatvirtuale');

//Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

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

app.get('/', function(req, res){
  res.send("testtt");
})

//start server
app.listen(port, function(){
  console.log('Server started on port '+port);
});

//coment testues per git push asdsdasd