var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var jade = require('jade');
var MongoClient = require('mongodb').MongoClient
, format = require('util').format;


//@@@@configure app
//app.set('view engine', 'ejs');
app.set('view engine', 'jade');
//__dirname is nodeJS variable gives the current working directory;
app.set('views', path.join(__dirname, 'views'));


//@@@@define middleware
//get the user inputs from HTML page to NODEjs(from client to server without ajax)
app.use(bodyParser.urlencoded({ extended: true }));

//epxress.static is for serving static data like images,CSS and JS file,font files to client
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'public')));
//@@@@@define routes
app.use(require('./router/router'));



//@@@@@starts server
app.listen(8000, function () {
    console.log('NODEJS Server is listening to 8000');
});