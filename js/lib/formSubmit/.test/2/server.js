#!/usr/bin/env node

{
	if (module !== process.mainModule) throw new Error(`${module.filename}: only can be used as main module!`);
	require('/^/ https://github.com/denisde4ev/html-css-js/raw/master/js/node/require-npm-i/1.js')(module);
}


var port = process.env.PORT || '8080';



void function main() {

var express = require('express');
var app = express();


if (1) { // logging
	var morgan = require('morgan');
	app.use(morgan('dev'));
}


// middleware to parse POST data:
{
	var bodyParser = require('body-parser');
	app.use(bodyParser.urlencoded({ extended: true })); // when 'application/x-www-form-urlencoded'
	app.use(bodyParser.json()); // when 'application/json'
}

app.post('/login', (req, res) => {
	console.log('POSTed to /login:' , req.body);
	var { username, password } = req.body;

	if (username === 'foo' && password === '123') {
		res.json({ success: true, username: 'Foo Bar' });
	} else {
		res.status(401).json({ success: false, message: 'Invalid credentials' });
	}
});

// Serve static files
app.use(express.static(__dirname));

// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}/`);
});


}();
