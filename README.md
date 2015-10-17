# TrondheimFolkebibliotek.js

Get a JSON list of books you have borrowed at Trondheim Folkebibliotek. (Node.js)


## Usage


Load the library:

	var TFB = require('./TFB').TFB;


Create an object feeded with username and password.

	var b = new TFB({
		"username": "N002531234",
		"password": "xxxx"
	});

Get a the list of books (uses Promises)

	b.getList()
		.then(function(books) {
			console.log(JSON.stringify(books, undefined, 2));
		});


The books structure will be similar to this:

	[
	  {
	    "cover": "https://krydder.bib.no/0781/9294267.bilde.1345622419.l.jpg",
	    "title": "Jeg er ikke trøtt!",
	    "deadlinetxt": "09/11/2015",
	    "extended": true,
	    "deadline": "2015-11-09T00:00:00.000Z",
	    "days": 23
	  },
	  {
	    "cover": "https://krydder.bib.no/0587/8394779.bilde.1335423428.l.jpg",
	    "title": "Svømmehallen",
	    "deadlinetxt": "09/11/2015",
	    "extended": true,
	    "deadline": "2015-11-09T00:00:00.000Z",
	    "days": 23
	  },
	  {
	    "cover": "https://krydder.bib.no/0016/1088422.bilde.1327467214.l.jpg",
	    "title": "Monster-Frida",
	    "deadlinetxt": "09/11/2015",
	    "extended": true,
	    "deadline": "2015-11-09T00:00:00.000Z",
	    "days": 23
	  },
	  {
	    "cover": "https://krydder.bib.no/0103/4916344.bilde.1315384063.l.jpg",
	    "title": "Trygg i trafikken",
	    "deadlinetxt": "09/11/2015",
	    "extended": true,
	    "deadline": "2015-11-09T00:00:00.000Z",
	    "days": 23
	  }
	]
