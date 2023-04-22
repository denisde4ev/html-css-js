

var sorter = arr => {

	for (let i = arr.length -1; 0 < i; ) {

		if (!( arr[i-1] <= arr[i] )) { // when not sorted
			// swap
			var t = arr[i];
			arr[i] = arr[i-1];
			arr[i-1] = t;

			if ( i == arr.length - 2 ) {
				i++;
				continue;
			}
		}
		i--;
	}
	return arr;
};



console.log('done: ', sorter([1, 33, 3, 2]));
//process.exit(0);


console.log('done: ', sorter([]));
console.log('done: ', sorter([1]));
console.log('done: ', sorter([1,2]));
console.log('done: ', sorter([3,1]));
console.log('done: ', sorter([1,2,3]));
console.log('done: ', sorter([1,3,2]));
console.log('done: ', sorter([3,1,2]));
console.log('done: ', sorter([3,2,3,1]));
console.log('done: ', sorter(Array.from({length:8}, _=>Math.random()*100)));
