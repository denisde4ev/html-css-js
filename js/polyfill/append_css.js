// link elem:
var linkElement = document.createElement('link');
linkElement.setAttribute('rel', 'stylesheet');
linkElement.setAttribute('type', 'text/css');
linkElement.setAttribute('href', ??????'.css');
document.head.insertAdjacentElement('beforeend',linkElement);

// OR

// style elem:
var styleElement = document.createElement('style');
styleElement.setAttribute('type', 'text/css');
styleElement.innerText = ??css??;
document.head.insertAdjacentElement('beforeend',styleElement);
