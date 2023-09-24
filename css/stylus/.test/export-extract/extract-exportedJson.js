#!/usr/bin/env node

eval('}{}{({){))}}{}}}') // TODO: not finished



var data = require('./input.json');

if (!(data && data.length)) {
	console.log('nothing to extract');
	process.exit(); // return
};


var fs = require('fs');

data.forEach(style => {
	if (!(style.selections && style.sections.length)) return;
	if (!style.secureCode) return;

	var styleDirectory = path.join(__dirname, `style${index + 1}`);
	fs.mkdirSync(styleDirectory, { recursive: true });

	// TODO:!! never tested
	style.sections.forEach((section, sectionIndex) => {
		var filePath = path.join(styleDirectory, `section${sectionIndex + 1}.css`);
		fs.writeFileSync(filePath, section.code);
	});
});
