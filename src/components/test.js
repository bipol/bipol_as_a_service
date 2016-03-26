var db = require('./db.js');
var markov = require('./markov.js');

function callback(data) {
	console.log(data.length);
}

db.getMessages(callback);

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
	console.log(sentence.join(' '));
}

markov.generateTM(callbackTM);
