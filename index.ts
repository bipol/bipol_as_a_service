// author: bipol
// date: 3/25/16
// index.js
// creates the web server to open the endpoint
// that allows a user to retrieve a bipol-ism


import * as express from "express";
import * as markov from "./src/components/markov";
import * as path from "path";

var app = express();

//create server
var server = app.listen(process.env.PORT || 8000, function () {
	var host = "127.0.0.1";
	var port = server.address().port;
	console.log('bass listening at http://%s:%s', host, port);
});

app.use(express.static('src'));

//routes
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/bipol', (req, res) => {
	this.res = res;
	markov.generateTM(callbackTM.bind(this));
});

function callbackTM(tm, ss) {
	var seed = Math.floor((Math.random() * ss.length) + 0);
	var state = ss[seed];
	var sentence = [];
	while ( tm[state].length != 0 && state != '') {
		var seed = Math.random();
		sentence.push(state);
		var probabilities = {};
		var total = 1;
		// get probabilities
		for (var nextState in tm[state]) {
			// don't worry about helper value
			if (nextState == 'length') {
				continue;
			// if there is only one state to transition to
			} else {
				probabilities[nextState] = total;
				total = total - tm[state][nextState];
			}
		}
		if (tm[state].length == 1) {
			state = nextState;
			continue;
		}
		for (var nextState in probabilities) {
			if (seed < probabilities[nextState]) {
				state = nextState;
			}
		}
	}
  this.res.send(sentence.join(' '));
}
