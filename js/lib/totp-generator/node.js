#!/usr/bin/env node

var totpGenerator = require('./index.js');
var fs = require('fs');



console.log(totpGenerator(fs.readFileSync(0).toString().trim()).join('\n'));
