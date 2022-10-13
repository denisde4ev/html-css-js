// minimal JavaScript DOM library similar to jQuery, idea from https://github.com/MonaTem/minjs

var $ = document.querySelector.bind(document)
$.new = document.createElement.bind(document)
Node.prototype.val = function (key, value){ this[key] = value; return this; }
Node.prototype.attr = function (){ this.setAttribute.apply(this,arguments); return this; }
Node.prototype.on = function (event, fn){ this.addEventListener(event, fn, false); return this; }
NodeList.prototype.on = function (event, fn){ this.forEach( function(v){v.on(event,fn)} ); return this; }
