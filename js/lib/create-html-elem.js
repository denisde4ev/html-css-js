
function htmlElement(text) {
	this.div.innerHTML = text;
	return (
		htmlElement.div.childElementCount === 1
		?htmlElement.div.firstChild
		:htmlElement.div.children
	);
}
htmlElement.div = document.createElement('div');
