var request = require('request');
	querystring = require('querystring'),
	fs = require('fs');

request.post('https://neweku.korea.ac.kr/member/memberLogin.eku', 
	function(error, response, body) {
		if (!error) {
			var location = response.headers.location;
  	
		  	request(location, function(error, response, body) {

		  		result = body;//iconv.convert(body).toString();

		  		if (!error && response.statusCode == 200) {
		  			fs.writeFile('./result.html', result, function(err, data) {
		  				if (err)
		  					return console.log(err);

		  				console.log(data);
		  			});
		  		}
		  	});
		}
	}).form({
		'user_id': 'sdw2648',
		'pwd': 'ehddnjsdld'
});