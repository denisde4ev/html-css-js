{
let css_style='';
let all = getComputedStyle($0);
for (let key of all) css_style+= `${key}: ${all[key]};\n`;
css_style;
 copy(css_style);
}
