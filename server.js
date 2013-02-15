var express = require('express'),
	lecture = require('./routes/lectures'),
	user = require('./routes/users'),
	userLecture = require('./routes/users_lectures');

var app = express();

app.configure(function() {
	app.use(express.favicon());
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

/* users lecture */
app.get('/usersLectures', userLecture.findAll);
app.get('/usersLectures/:id', userLecture.findById);
app.post('/usersLectures', userLecture.addUserLecture);
app.put('/usersLectures/:id', userLecture.updateUserLecture);
app.delete('/usersLectures/:id', userLecture.deleteUserLecture);

app.listen(8080);
console.log("Server running on port 8080...");
