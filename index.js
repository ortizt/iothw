var express = require("express");
var parser = require("body-parser");
var mongoose = require("mongoose");
var app = express();

mongoose.connect("mongodb://localhost:27017/test");

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
    console.log("Connection to MongoseDB  succeded.\n");
});


app.use(parser.json({extended : true}));

app.post("/", function(request, response) {
    console.log(request.body);
    db.collection('users').insert(request.body, function(error, result){
        if(error) {
            response.end("Error saving data!\n");
        }
	else {
	    response.end("Success: JSON received and stored.\n");
	}
    })
});

app.listen(3000);
