var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');

mongoose.connect('mongodb://localhost/webdxd');

var studentSchema = {
	firstname: String,
	lastname: String,
	email: String,
	age: Number
}

// map the 'student' collection in the mongodb to the object 'Student'
var Student = mongoose.model('Student', studentSchema, 'student');

var app = express();

app.use(cors());


app.get('/', function(req, res){
	res.send('Hello World!');
})

app.get('/student', function(req, res){
	Student.find().select('firstname age').exec(function(err, doc){
		res.send(doc);
	})
});

app.get('/student/:id', function(req, res){
	Student.findById(req.params.id, function(err, doc){
		res.send(doc);
	})
});

app.listen(3000);