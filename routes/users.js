var mysql = require('mysql'),
	async = require('async'),
	meku = require('../meku');

var connection = mysql.createConnection({
	host : '192.168.147.139',
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
	console.log('Adding User: ' + User);

	async.auto([
		function(callback) {
			connection.query(
				'INSERT into ' + table + ' ' +
				'SET notify = ?',
				[User.notify],
				function(err, rows, fields) {

					if (err) throw err;
					
					console.log(rows.insertId);
					callback(null);
				}
			);
		},
		function(callback) {
			meku.getLectureList(User.user_id, User.passwd,
				function(err, result) {
					if (err) throw err;
					callback(null, result);
				});
		}],
		function(err, result) {

			console.log(result);

			if(err)
				res.send(err);
			else
				res.send(result[1]);
		}
	);
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
