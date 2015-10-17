var fs = require('fs');
var TFB = require('./TFB').TFB;


var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
var b = new TFB(config);


b.getList()
	.then(function(data) {
		// console.log("--- data ");
		// console.log(data);


		fs.writeFile("./bib.json", JSON.stringify(data, undefined, 2), function(err) {
		    if(err) {
		        return console.log(err);
		    }
		}); 


	});

// console.log(config);




exports.TFB = TFB;





