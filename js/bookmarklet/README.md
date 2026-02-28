

## Page Specific:


### Vivaldi Mail open all selected mails to new separate tabs

``` javascript
javascript:document.querySelectorAll('.message.selected a').forEach(el=> { window.open(el.href, "_blank"); });
```
