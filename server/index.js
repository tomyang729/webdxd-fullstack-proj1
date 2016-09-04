var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');

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
app.use(bodyParser.json());


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

app.post('/new', function (req, res) {

	var newStudent = new Student(req.body);

	newStudent.save(function (err, doc) {
		res.send(doc);
	});

})

app.listen(3000);