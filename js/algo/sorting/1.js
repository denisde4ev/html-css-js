

var arr = Array.from({length:100}, _=>Math.random()*100|0);


var sorter = arr => {
	console.log('checking', arr , 2 <= arr.llength);
	if (!( 2 <= arr.length )) {
		console.log('not for sorting: ', arr);
		return false;
	}
	for (let i = arr.length -1; ; ) {
		if (arr[i-1] <= arr[i]) {
			i--;
			if (!( 1 <= i )) break;
		} else {
			// swap
			arr[i-1] ^= arr[i];
			arr[i]   ^= arr[i-1];
			arr[i-1] ^= arr[i];

			i++;
			if (!( i < arr.length )) {
				i -= 2;
				if (!( 1 <= i )) {
					console.log('bad arr: ', arr);
					break
				}
			}
		}
	}
	return arr;
};

console.log('done: ', sorter(arr));
console.log('done: ', sorter([1]));
console.log('done: ', sorter([1,2]));
console.log('done: ', sorter([1,2,3]));
console.log('done: ', sorter([1,3,2]));
console.log('done: ', sorter([3,1,2]));
console.log('done: ', sorter([3,1]));
console.log('done: ', sorter([3,2,3,1]));
