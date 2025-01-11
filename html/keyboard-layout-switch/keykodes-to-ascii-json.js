
var a = require('./keycodes.json');
var b = Object.entries(keycodes).map(([k,v])=> (v.key2 = k, v) );


var c = '{\n'+
b.map(a=>{

if (!a.hasOwnProperty('keyCode')) return `// note: ${JSON.stringify(a.key2)} does not have its own .keyCode`;

var k = 

return `"${k}": "${v}"${comment||''}`;

}).slice(0,10).join('\n')
+ '\n}'
