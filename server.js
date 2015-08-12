var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']); //1st contactlist is db name and second contactlist is collection name
var bodyParser = require('body-parser');

var port = process.env.PORT || 6060;

/*app.get('/',function(req,res){
    res.send("hello worls from server.js");
});*/




app.use(express.static(__dirname + "/public")); //to tell the server to look in public folder for static pages

app.use(bodyParser.json());                    // to parse the object so that it can bhe inserted in the database

app.get('/contactlist',function(req,res){
    console.log("Get Req recieved");
    
    db.contactlist.find(function(err,docs){
        console.log(docs);
        res.json(docs); 
    });
});

app.post('/contactlist',function(req,res){
    console.log(req.body);
    db.contactlist.insert(req.body,function(err,doc){
        res.json(doc);
    });
});

app.delete('/contactlist/:id',function(req,res){
    console.log("Inside server");
    
    var id = req.params.id;
    console.log("Requested id" + id);
    db.contactlist.remove({_id: mongojs.ObjectId(id)},function(err,doc){
        res.json(doc);
    });  
});


app.get('/contactlist/:id',function(req,res){
    var id = req.params.id;
    console.log(id);
    db.contactlist.findOne({_id: mongojs.ObjectId(id)},function(err,doc){
        res.json(doc);
    });
});
        
app.put('/contactlist/:id',function(req,res){
    var id= req.params.id;
    console.log(req.body.name);
    console.log(req.body._id);
    
    //MongoDB Update Query
    db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function (err, doc) {
			res.json(doc);
		});
});
        
        
        
app.listen(port,function(){
    console.log('Gulp is running on port: ' + port);
});

//app.listen(3030);
//console.log("Server is listening at 3030 post");
