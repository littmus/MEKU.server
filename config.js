var mysql = require('mysql');

var SERVER = '192.168.147.139',
	SERVER_DB_USER = 'root',
	SERVER_DB_PASSWORD = 'ted705',
	SERVER_DB = 'meku';

exports.DB_CONN = mysql.createConnection({
	host : SERVER,
	user : SERVER_DB_USER,
	password : SERVER_DB_PASSWORD,
	database : SERVER_DB,
});