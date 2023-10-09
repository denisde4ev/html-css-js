
function document_createElementHTML(html) {
	document_createElementHTML__tmp.innerHTML = html;
	return document_createElementHTML__tmp.firstElementChild;
}
document_createElementHTML__tmp = document.createElement('div');
