
throw 'this is just from mind demo'


// usage:

{
	attrtest1 = h1.attributes.test1;
	attrtest2 = attrtest1.cloneNode();
	attrtest1.removeAttributeNode();
}

span = document.createElement('span');
iText = 'h';

template`<h1 ${arg1} ${attrtest2}>`

// todo: handle arguments correctly?
function template() {



doc = document.implementation.createHTMLDocument('');
doc.write('<span id=hook>');
// problem: what if we are in <style> or <script> or comment
// solution: forbide to the user to use `${}` inside non html places
// and print warning if cant find the `#hook`
// the result will have the span as text/
var endhook 


}

{ // testing in devtools

doc = document.implementation.createHTMLDocument('');
doc.write('<br>'); doc.write('<style>'); doc.write('<span>');  doc.all?.[0]?.outerHTML;

}
