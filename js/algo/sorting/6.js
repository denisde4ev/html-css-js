

var sorter = arr => {

	for (let i = -1; ++i < arr.length-1;) {

		if (!( arr[i] <= arr[i+1] )) { // if not sorted
			{ // swap
				var t = arr[i];
				arr[i] = arr[i+1];
				arr[i+1] = t;
			}

			if ( 0 < i ) i -= 2;
		}
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
