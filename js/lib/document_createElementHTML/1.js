// better use: lib/create-html-elem.js

function document_createElementHTML(html) {
	document_createElementHTML__tmp.innerHTML = html;
	return document_createElementHTML__tmp.firstElementChild;
}
var document_createElementHTML__tmp = document.createElement('div');
