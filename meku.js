var request = require('request'),
	async = require('async'),
	fs = require('fs'),
	execsync = require('exec-sync'),
	cheerio = require('cheerio');

var EKU_BASE = 'http://neweku.korea.ac.kr',
	EKU_LOGIN = 'https://neweku.korea.ac.kr:member/memberLogin.eku',
	EKU_CLASSROOM = EKU_BASE + '/classroom/main.eku';

exports.login = function(id, password) {
	var cookie = "";

	async.waterfall([
		function(callback) {
			request.post(EKU_LOGIN, function(err, response, body) {
					if (err) throw err;
					callback(null, response.headers.location);
			}).form({
				'user_id': id,
				'pwd': password
			});
		}],
		function(err, result) {
			if (err) throw err;

			return result;
		}
	]);
};

exports.getLectureList = function(id, password) {
	var lectures = '{"lectures": [';

	async.waterfall([
		function(callback) {
			request.post(EKU_LOGIN, function(err, response, body) {
					if (err) throw err;
					callback(null, response.headers.location);
			}).form({
				'user_id': id,
				'pwd': password
			});
		},
		function(location, callback) {
			request({
				method: 'GET',
				uri: location,
				encoding: null
				}, function(err, response, body) {
					if (err) throw err;
					if (response.statusCode == 200)
						callback(null, body);
			});
		},
		function(body, callback) {
			fs.writeFile(__dirname + '/result.html', body, function(err) {
				if (err) throw err;
				var iconv = execsync('iconv -f EUC-KR ' + __dirname + '/result.html -o ' + __dirname + '/encoded.html');
				
				callback(null);
			});
		},
		function(callback) {
			fs.readFile(__dirname + '/encoded.html', function (err, data) {
				if (err) throw err;
				
				var tmp = data.toString();
				tmp = tmp.split('<div class="article">');
				tmp = tmp[1].split('</div>');
				tmp = tmp[0].split('<tbody>');
				tmp = tmp[1].split('</tbody>');

				$ = cheerio.load(tmp[0]);
				$('tr').each(function() {
					var items = $(this).find('td');
					var lecture = '{"number": "' + items.eq(1).text() + '_' + items.eq(2).text() + '", "name": "' + items.eq(0).find('a').text() + '"}';
					lectures += lecture + ', ';
				});
				lectures = lectures.substr(0, lectures.length - 2);
				lectures += ']}';

				var remove_html = execsync('rm -rf ' + __dirname + '/result.html ' + __dirname + '/encoded.html');

				callback(null, lectures);
			});
		}],
		function(err, result) {
			if(err) throw err;

			console.log(result);
			//return JSON.parse(result);
			return result;
		}
	);
};

exports.goClassroom = function(classNumber, className) {
	
}