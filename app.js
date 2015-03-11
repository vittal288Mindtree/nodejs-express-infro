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

//@@@@@define routes
app.use(require('./router/router'));


//@@@@MONGO DB client connection 
MongoClient.connect('mongodb://127.0.0.1:27017/sample', function (err,db) {
    if (err) throw err;
    var collection = db.collection('test_insert');
    collection.insert({ a: 1020535 }, function (err, docs) {

        collection.count(function (err, count) {
            console.log(format("count = %s", count));
        });

        // Locate all the entries using find 
        collection.find().toArray(function (err, results) {
            console.dir(results);
            // Let's close the db 
            db.close();
        });
    });
});
//@@@@@starts server
app.listen(8000, function () {
    console.log('NODEJS Server is listening to 8000');
});