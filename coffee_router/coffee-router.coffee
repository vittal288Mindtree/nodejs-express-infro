express = require("express")
app = express();
router =  express.Router();
mangoose = require("mongoose");
MongoClient = require("mongodb").MongoClient
format= require("util").format
########################################################################

User=(name,email) ->
    @name = name
    @email=email
#return

users = [
    new User('Vittal Kamkar', 'vittal.kamkar2@mindtree.com'),
    new User('Jitendra Daswani', 'Jitendra.Daswani@mindtree.com'),
    new User('Himangshu Das', 'Himangshu.Das@mindtree.com')
]   


#define Router start
router.get "/",(req,res)->
    console.log "COFFEE INDEX"
    res.render "index",users:users    
#return


router.post '/add',(req,resp)->
    newItem = req.body.newItem
    console.log 'form field',newItem
    toDoItems.push
        id:toDoItems.length+1,
        desc:newItem
    resp.redirect "/"
#return

#MONGO DB connection
###
if 'development' === app.get('env')
    console.log "I am in development";
    mongoose.connect "mongodb://127.0.0.1:27017/sample"
###
  
router.get "/users",(req,res)->
    console.log("USERS");
    MongoClient.connect "mongodb://127.0.0.1:27017/sample", (err,db) ->
        if err 
            throw err
        collection = db.collection("user_records")
        collection.find().toArray (err,results) ->
            console.dir results;
            res.render "dynamic-user-layout",results:results
            db.close()
        #return
    #return
#return

router.get '*', (req, res) ->
    res.status(405).send 'Method Not Allowed'
    #return
#define Router end


##exporting router globally
module.exports = router




       
            
