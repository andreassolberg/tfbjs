var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var querystring = require('querystring')



if (typeof String.prototype.startsWith !== 'function') {
	// see below for better implementation!
	String.prototype.startsWith = function(str) {
		return this.indexOf(str) === 0;
	};
}


var TFB = function(config) {

	this.jar = request.jar();
	this.config = {
		"sourceid": "mappami",
		"mode": "login",
		"lnr": config.username,
		"passord": config.password,
		"hskmg": "1"
	};

};

TFB.prototype.login = function() {

	var that = this;
	return new Promise(function(resolve, reject) {


		var url = 'https://www.tfb.no/cgi-bin/mappami';
		request.post({
			"jar": that.jar,
			"uri": url,
			"headers": {
				'content-type': 'application/x-www-form-urlencoded'
			},
			"body": querystring.stringify(that.config)
		}, function(error, response, body) {

			if (!error) {
				resolve();
			} else {
				reject(error);
			}

		});


	});

}

TFB.prototype.performListRequeset = function() {

	var that = this;
	return new Promise(function(resolve, reject) {

		var url = 'https://www.tfb.no/cgi-bin/mappami?mode=vislaan';
		request({
			"url": url,
			"jar": that.jar,
			"headers": {
				// 'cookie': 'sesjid=xxxxxx; style=S',
				'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.125 Safari/537.36',
				'referer': 'https://www.tfb.no/cgi-bin/mappami?mode=vislaan'
			}
		}, function(error, response, body) {


			if (error) {
				return reject()
			}

			// console.log("status code ", response.statusCode);

			var $ = cheerio.load(body);

			var data = [];
			var tsnow = (new Date()).getTime();
			var dr = /(\d{2})\/(\d{2})\/(\d{4})/;

			$('.tabellUtlaan tbody tr').each(function(i, elem) {

				var e = $(this);
				// console.log("-------");
				// console.log();
				var x = {};
				x.cover = e.find('td').eq(0).find('img').eq(0).attr('src');
				x.title = e.find('td').eq(1).find('a').last().text().trim();
				x.deadlinetxt = e.find('td').eq(3).text().trim();
				x.extended = e.find('td').eq(4).text().trim().startsWith('Ja');
				x.username = that.config.lnr;

				var p = dr.exec(x.deadlinetxt);
				var pnd = p[3] + '-' + p[2] + '-' + p[1];
				x.p = pnd;
				x.deadline = new Date(pnd);
				x.days = Math.ceil((x.deadline.getTime() - tsnow) / (1000 * 3600 * 24));
				// x.deadline = $(this).find('td[3]').text();
				data.push(x);
			});

			return resolve(data);



		});


	});

}


TFB.prototype.getList = function() {
	var that = this;
	return this.login()
		.then(function() {
			return that.performListRequeset();
		});

}



exports.TFB = TFB;