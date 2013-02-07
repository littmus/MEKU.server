var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'ted705',
	database : 'meku',
});
var table = 'meku_users';

connection.connect();

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
	console.log('Get Users');
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

exports.addUser = function(req, res) {
	var User = eval('(' + JSON.stringify(req.body) + ')');
	console.log('Adding User: ' + User.number + User.name);

	connection.query(
		'INSERT into ' + table + ' ' +
		'SET number = ?, name = ?',
		[User.number, User.name],
		function(err, rows, fields) {

			if (err) {
				res.send(err);
			}
			else {
				res.send(rows.insertId);
			}
	});
};

exports.updateUser = function(req, res) {
	var id = req.params.id;
	var User = eval('(' + JSON.stringify(req.body) + ')');
	console.log('Updating User: ' + id);
	
	connection.query(
		'UPDATE ' + table + ' ' +
		'SET number = ?, name = ? ' + 
		'WHERE id = ?',
		[User.number, User.name, id],
		function(err, rows, fields) {

			if (err) {
				res.send(err);
			}
			else {
				res.send(rows);
			}
	});
};

exports.deleteUser = function(req, res) {
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