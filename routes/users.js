var mysql = require('mysql'),
	async = require('async'),
	config = require('../config'),
	meku = require('../meku');

var connection = config.DB_CONN;

var table = 'meku_users';

//connection.connect();

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

	async.waterfall([
		function(callback) {
			connection.query(
				'INSERT into ' + table + ' ' +
				'SET notify = ?',
				[User.notify],
				function(err, rows, fields) {
					if (err) throw err;
					callback(null, rows);
				}
			);
		},
		function(user, callback) {
			console.log(user);
			meku.getLectureList(User.user_id, User.passwd,
				function(err, result) {
					if (err) throw err;
					callback(null, user, result);
				}
			);
		},
		function(user, list, callback) {
			var lectureList = JSON.parse(list).lectures;

			console.log(lectureList);

			async.each(lectureList, function(lecture, cb) {
				console.log(lecture.name);

				async.waterfall([
					function(callback) {

						connection.query(
							'INSERT into meku_lectures ' +
							'SET number = ?, name = ?',
							[lecture.number, lecture.name],
							function(err, rows, fields) {

								if (err) {
									if (err.code == 'ER_DUP_ENTRY') {
										connection.query(
											'SELECT id ' + 
											'FROM meku_lectures ' +
											'WHERE number = ?',
											[lecture.number],
											function(err, rows, fields) {
												if (err) throw err;
												callback(null, rows[0].id);
											}
										);
									}
									else throw err;
								}
								else {
									callback(null, rows.insertId);	
								}
							}
						);
					},
					function(lecture_id, callback) {
						connection.query(
							'INSERT into meku_users_lectures ' + 
							'SET user_id = ?, lecture_id = ?',
							[user.insertId, lecture_id],
							function(err, rows, fields) {
								if(err) throw err;
								callback(null);
							}
						);
					}],
					function(err, result) {
						if (err) cb(err);
						cb(null);
					}
				);
			}, function(err) {
				if (err) throw err;
				callback(null, user);
			});
		}],
		function(err, result) {
			if(err)
				res.send(err);
			else
				res.send(result);
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
