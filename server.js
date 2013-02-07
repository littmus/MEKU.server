var express = require('express'),
	lecture = require('./routes/lectures'),
	user = require('./routes/users');

var app = express();

app.configure(function() {
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
});

/* lectures */
app.get('/lectures', lecture.findAll);
app.get('/lectures/:id', lecture.findById);
app.post('/lectures', lecture.addLecture);
app.put('/lectures/:id', lecture.updateLecture);
app.delete('/lectures/:id', lecture.deleteLecture);

/* users */
app.get('/users', user.findAll);
app.get('/users/:id', user.findById);
app.post('/users', user.addUser);
app.put('/users/:id', user.updateUser);
app.delete('/users/:id', user.deleteUser);

app.listen(8080);
console.log("Server running on port 8080...");