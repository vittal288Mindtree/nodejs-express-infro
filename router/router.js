var express = require('express');
var app = express();
var mongoose = require('mongoose');
var router = express.Router();

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
mongoose.model('users', { name: String });
//console.log('ENVIRONMENT', app.get('env'));
if ('development' == app.get('env')) {

    console.log('I am in developmet')
    //app.use(express.errorHandler());
    mongoose.connect('mongodb://127.0.0.1:27017/sample');
}
router.get('/users', function (req,res) {
    //resp.send('Mongoose Database Connection here'); 
    mongoose.model('users').find(function(err,users){    
        res.send(users)
    });


    });

router.get('*', function (req, res) {
    res.status(405).send(   'Method Not Allowed');
});
module.exports = router;