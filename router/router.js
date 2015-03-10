var express = require('express');
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
    new User('tj', 'tj@vision-media.ca'),
    new User('ciaran', 'ciaranj@gmail.com'),
    new User('aaron', 'aaron.heckmann+github@gmail.com')
];

router.get('/', function (req, res) {
    res.render('index', { users: users });
});

router.get('*', function (req, res) {
    res.send(405, 'Method Not Allowwd');
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



module.exports = router;