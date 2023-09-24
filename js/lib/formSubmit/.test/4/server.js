diff --git a/js/lib/formSubmit/.test/4/server.js b/js/lib/formSubmit/.test/4/server.js
index 68eec45..fb4a305 100755
--- a/js/lib/formSubmit/.test/4/server.js
+++ b/js/lib/formSubmit/.test/4/server.js
@@ -1,65 +1,52 @@
 #!/usr/bin/env node
 
-// NOTE!: AI created this code
-// prompt:
-// ```using nodejs, create server.js that uses express to listen on port variable `var port = PROCESS.env.PORT || '8080';`.
-// must have /login that just checks if username is foo and password 123, and then returns application/json response with `{ "succsess": true, "username": "Foo Bar" }`. 
-// else returns static file from curren directory, for example ./style.css
-// ```
+{
+	if (module !== process.mainModule) throw new Error(`${module.filename}: only can be used as main module!`);
+	require('/^/ https://github.com/denisde4ev/html-css-js/raw/master/js/node/require-npm-i/1.js')(module);
+}
 
 
+var port = process.env.PORT || '8080';
 
-var express = require('express');
-var morgan = require('morgan'); // logging
-var bodyParser = require('body-parser');
-var path = require('path');
 
+
+void function main() {
+
+var express = require('express');
 var app = express();
-var port = process.env.PORT || '8080';
 
-// enable logging
-app.use(morgan('dev')); 
+
+if (1) { // logging
+	var morgan = require('morgan');
+	app.use(morgan('dev'));
+}
 
 
-// Middleware to parse POST data:
+// middleware to parse POST data:
 {
+	var bodyParser = require('body-parser');
 	app.use(bodyParser.urlencoded({ extended: true })); // when 'application/x-www-form-urlencoded'
 	app.use(bodyParser.json()); // when 'application/json'
 }
 
-var simulateDelay = (req, res, next) => {
-	// note: ai generated! idk how it works
-
-	// Delay request processing by 1/2 seconds
-	setTimeout(next, .5e3);
-
-	// Delay response completion by 1/2 seconds
-	var endOriginal = res.end;
-	res.end = (...args) => {
-		setTimeout(() => {
-			endOriginal.apply(res, args);
-		}, .5e3);
-	};
-};
-
-
-// Endpoint for /login
-app.post('/login', simulateDelay, (req, res) => {
+app.post('/login', (req, res) => {
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
 
+
+}();
