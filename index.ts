// author: bipol
// date: 3/25/16
// index.js
// creates the web server to open the endpoint
// that allows a user to retrieve a bipol-ism


import * as express from "express";

var app = express();

//create server
var server = app.listen(process.env.PORT || 8000, function () {
	var host = "127.0.0.1";
	var port = server.address().port;
	console.log('bass listening at http://%s:%s', host, port);
});

//routes
app.get('/bipol', (req, res) => {
	let message = req.body;
  res.sendFile('./src/index.html');
});
