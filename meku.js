var request = require('request'),
	async = require('async'),
	fs = require('fs'),
	execsync = require('exec-sync'),
	cheerio = require('cheerio');

var EKU_BASE = 'http://neweku.korea.ac.kr',
	EKU_LOGIN = 'https://neweku.korea.ac.kr:443/member/memberLogin.eku',
	EKU_CLASSROOM = EKU_BASE + '/classroom/main.eku',
	EKU_NOTICE = EKU_BASE + '/classroom/notice/noticeList.eku';

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
			if (err) ;

			return result;
		}
	);
};

exports.getLectureList = function(id, password, cb) {
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
			console.log(location);

			if (location.search("fail=Y") == -1) {	
				request({
					method: 'GET',
					uri: location,
					encoding: null
					}, function(err, response, body) {
						if (err) throw err;
						if (response.statusCode == 200)
							callback(null, body);
				});	
			}
			else
				callback(true, null);
			
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
			if (err)
				cb(err, null);
			else {
				console.log(result);
				cb(null, result);	
			}
			
		}
	);
};

exports.changeSemester = function(semester) {
	async.waterfall([
		function(callback) {
			request.get(EKU_BASE, function(err, response, body) {
				if (err) throw err;
				
				callback(null, body);
			}).form({
				'stm': 'changeYearterm',
				'yearterm': semester,
				'x': '19',
				'y': '21'
			}); 
		}],
		function(err, result) {
			if (err) throw err;

			return result;
		}
	);

};

exports.goClassroom = function(classNumber, className) {
	async.waterfall([
		function(callback) {
			request.post(EKU_CLASSROOM, function(err, response, body){
				if (err) throw err;
				
				callback(null, response.headers.location);
			}).form({
				'stm': 'classroom',
				'classroom_data': 'CNCE220_02_0136_N_4728_계산이론(영강)_THEORY OF COMPUTATION(English)_111373_2010210104_N_N_3'
			});
		},
		function(location, callback) {
			request.get(location, function(err, response, body) {
				if(err) throw err;
				console.log(body);

				callback(null, body);
			})
			/*
			if (location.search("fail=Y") == -1) {	
				request({
					method: 'GET',
					uri: location,
					encoding: null
					}, function(err, response, body) {
						if (err) throw err;
						console.log(response);
						if (response.statusCode == 200)
							callback(null, body);
				});
			}
			else
				callback(true, null);
			*/
		}
		],
		function(err, result) {
			if (err) throw err;
			
			return result;
		}
	);
};

exports.getNotice = function() {
	async.waterfall([
		function(callback) {
			request.get(EKU_NOTICE, function(err, response, body) {
				if (err) throw err;
				console.log(body);
				callback(null, body);
			});
		}],
		function(err, result) {
			if (err) throw err;

			return result;
		}
	);
};