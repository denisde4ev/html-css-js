#!/usr/bin/env node

var totpGenerator = require('./main.js');
var fs = require('fs');



console.log(totpGenerator(fs.readFileSync(0).toString().trim()).join('\n'));
