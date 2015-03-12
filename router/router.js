var express = require('express');
var app = express();
var mongoose = require('mongoose');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient,
    format = require('util').format;

/*var toDoItems = [
            { id: 1, desc: 'foo' },
            { id: 2, desc: 'bor' },
            { id: 3, desc: 'bor' },
];
router.get('/', function (req, res) {
    //res.send('Hello Express');  
    res.render('index', {
        title: 'My App',
        items: toDoItems
    });
});*/
function User(name, email) {
    this.name = name;
    this.email = email;
}

var users = [
    new User('Vittal Kamkar', 'vittal.kamkar2@mindtree.com'),
    new User('Jitendra Daswani', 'Jitendra.Daswani@mindtree.com'),
    new User('Himangshu Das', 'Himangshu.Das@mindtree.com')
];

router.get('/', function (req, res) {
    //loads the seperate view called index
    res.render('index', { users: users });
});



router.post('/add', function (req, resp) {

    var newItem = req.body.newItem;
    console.log('form field', newItem);
    toDoItems.push({
        id: toDoItems.length + 1,
        desc: newItem,
    });

    //once submit redirect to index or / page
    resp.redirect("/");

});

//@@@@@CONNECTION TO MONOGO DB
/*mongoose.model('users', { name: String });
if ('development' == app.get('env')) {

    console.log('I am in developmet')   
    mongoose.connect('mongodb://127.0.0.1:27017/sample');
}*/

router.get('/users', function (req,res) {
    //@@@@MONGO DB client connection 
    MongoClient.connect('mongodb://127.0.0.1:27017/sample', function (err, db) {
        /* if (err) throw err;
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
         });*/


        //feetch records from MONGODB
        if (err) throw err;
        var collection = db.collection('user_records');
        collection.find().toArray(function (err, results) {
            console.dir(results);
            //res.send(results);
            res.render('dynamic-user-layout', { results: results });
            db.close();
        });
    });

   
    

});

router.get('*', function (req, res) {
    res.status(405).send(   'Method Not Allowed');
});
module.exports = router;