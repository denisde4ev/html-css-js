for(let i=a.length-1;0<=--i;){if(!(a[i]<=a[i+1])){var t=a[i];a[i]=a[i+1];a[i+1]=t;if(i+2<a.length)i+=2;}} // 5
for(let i=-1;++i<a.length-1;){if(!(a[i]<=a[i+1])){var t=a[i];a[i]=a[i+1];a[i+1]=t;if(0<i)i-=2;}} // 6
