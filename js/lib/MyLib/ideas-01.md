mylibs={
fetch
cache string
load
run
}
-------
mylibs.run.proxy.mycountlib([1,2,3])
-------
mylibs.load('mycountlib').then
-------
mylib = new MyLib('https://github.com/denisde4ev/html-css-js/raw/master/js', 3e3, 100)
-------
3e3 seconds before first lazy load
100 time between lazy load
mylib.lazy('mycountlib')

// will take time before starts fetching
-------
denisde4evGhJs = mylib
-------
mylibs={
lazy
fetch
cache string
load
run
}
-------
if mylibs.preObj._o.mycountlib;;
a= mylibs.preObj('mycountlib')
a= mylibs.preObj.proxy.mycountlib

if a.exports; loaded; else not;


will not cause load neither lazy
-------
lazy load lib to be optional addition

