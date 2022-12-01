Element.prototype.changeTagName = function rename_element(ntag) {
	var i,newelem = document.createElement(ntag || this.tagName);
	for (i of this.attributes) {
		newelem.setAttribute(i.nodeName, i.nodeValue);
	}
	while (i=this.firstChild) {
		newelem.appendChild(i);
	}
	this.parentNode.replaceChild(newelem, this);
	return newelem;
}
