var mysql = require('mysql'),
	config = require('../config');

var connection = config.DB_CONN;

var table = 'meku_users_lectures';

exports.findById = function(req, res) {
	var id = req.params.id;
	console.log('Get User: ' + id);
	connection.query(
		'SELECT * ' + 
		'FROM ' + table + ' ' +
		'WHERE id = ?',
		[id],
		function(err, rows, fields) {

			if (err) {
				res.send(err);
			}
			else {
				res.send(rows[0]);	
			}
	});
};

exports.findAll = function(req, res) {

	if (req.query.userId) {
		var userId = req.query.userId;
		console.log('Get User ' + userId + ' Lectures');

		connection.query(
			'SELECT a.* ' +
			'FROM ' + table + ' as b, meku_lectures as a ' + 
			'WHERE a.id = b.lecture_id and b.user_id = ? ' +
			'ORDER BY a.number',
			[userId],
			function(err, rows, fields) {

				if (err) {
					res.send(err);
				}
				else {
					res.send(rows);
				}
		});
	}
	else {
		connection.query(
			'SELECT * ' +
			'FROM ' + table,
			function(err, rows, fields) {
			
				if (err) {
					res.send(err);
				}
				else {
					res.send(rows);	
				}
		});
	}
};

exports.addUserLecture = function(req, res) {
	var UserLecture = eval('(' + JSON.stringify(req.body) + ')');
	console.log('Adding Users Lecture: ' + UserLecture.user_id + UserLecture.lecture_id);

	connection.query(
		'INSERT into ' + table + ' ' +
		'SET user_id = ?, lecture_id = ?',
		[UserLecture.user_id, UserLecture.lecture_id],
		function(err, rows, fields) {

			if (err) {
				res.send(err);
			}
			else {
				res.send(rows.insertId);
			}
	});
};

exports.updateUserLecture = function(req, res) {
	var id = req.params.id;
	var UserLecture = eval('(' + JSON.stringify(req.body) + ')');
	console.log('Updating Users Lecture: ' + id);
	
	connection.query(
		'UPDATE ' + table + ' ' +
		'SET user_id = ?, lecture_id = ?' +
		'WHERE id = ?',
		[UserLecture.user_id, UserLecture.lecture_id],
		function(err, rows, fields) {

			if (err) {
				res.send(err);
			}
			else {
				res.send(rows);
			}
	});
};

exports.deleteUserLecture = function(req, res) {
	var id = req.params.id;
	console.log('Deleting User: ' + id);
	
	connection.query(
		'DELETE FROM ' + table + ' ' +
		'where id = ?',
		[id],
		function(err, rows, fields) {

			if (err) {
				res.send(err);
			}
			else {
				res.send(rows);
			}
	});
};
