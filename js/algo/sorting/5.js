

var sorter = arr => {

	for (let i = arr.length-1; 0 <= --i; ) {

		if (!( arr[i] <= arr[i+1] )) { // when not sorted
			// swap
			var t = arr[i];
			arr[i] = arr[i+1];
			arr[i+1] = t;

			// 2nd = i+1
			// next loop = 2nd+1
			if ( i+1 +1 < arr.length) {
			//if ( i != arr.length -2 ) {
				i += 2;
			}
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
