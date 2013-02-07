var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'ted705',
	database : 'meku',
});
var table = 'meku_lectures';

connection.connect();

exports.findById = function(req, res) {
	var id = req.params.id;
	console.log('Get Lecture: ' + id);
	connection.query(
		'SELECT * ' + 
		'FROM ' + table + ' ' +
		'WHERE id = ?' + 
		'LIMIT 1',
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
	console.log('Get Lectures');
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
};

exports.addLecture = function(req, res) {
	var lecture = eval('(' + JSON.stringify(req.body) + ')');
	console.log('Adding lecture: ' + lecture.number + lecture.name);

	connection.query(
		'INSERT into ' + table + ' ' +
		'SET number = ?, name = ?',
		[lecture.number, lecture.name],
		function(err, rows, fields) {

			if (err) {
				res.send(err);
			}
			else {
				res.send(rows.insertId);
			}
	});
};

exports.updateLecture = function(req, res) {
	var id = req.params.id;
	var lecture = eval('(' + JSON.stringify(req.body) + ')');
	console.log('Updating lecture: ' + id);
	
	connection.query(
		'UPDATE ' + table + ' ' +
		'SET number = ?, name = ? ' + 
		'WHERE id = ?',
		[lecture.number, lecture.name, id],
		function(err, rows, fields) {

			if (err) {
				res.send(err);
			}
			else {
				res.send(rows);
			}
	});
};

exports.deleteLecture = function(req, res) {
	var id = req.params.id;
	console.log('Deleting lecture: ' + id);
	
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