#!/usr/bin/env node

const fs = require('fs');


/** // (ai jsdoc, idk if works)
 * Splits `arr` into subarrays of up to `chunkSize` items,
 * but if a splitter value appears before that limit it splits there instead.
 *
 * @param {Array} arr           - the source array
 * @param {Array} splitters     - ordered list of values to force‐split on
 * @param {number} chunkSize    - default maximum chunk length
 * @returns {Array<Array>}      - array of subarrays
 */
function splitWithSplitters(arr, splitterArr, chunkSize = 10) {
	var chunkI = 0;
	var splitterI = 0;

	return arr.reduce((r,a,i,arr) => {
		var splitting = false;
		var log = '';
		
		if (splitterArr[splitterI] === a) {
			if (i !== 0) splitting = true;
			splitterI++;
			if (i !== 0) log = `//split (${chunkI || chunkSize})`;
			chunkI = 0;
		} else if (chunkI === 0) {
			if (i !== 0) splitting = true;
		}

		//if (i === 0) splitting = false;

		r += (
			(splitting ? '\n' : '')+
			(log && log+'\n')+
			a+'\n'+
		'');

		chunkI++;
		chunkI %= chunkSize;

		return r;
	}, '');
	if (0) {
		var result = [];

		var splitterArr =
			splitterArr
			// .map((val) => arr.indexOf(val)) // remove dups (not needed for my sexample)
		;


		for (let i = 0, splitterI = 0; false && false && false && false; ) {}

		return result;
	}
}

//if (0) {
//// Example:
//var data = [
//	1,   2,   3,   4,   5,   6,   7,   8,   9,   10,
//	11,  22,  33,
//
//	44,  55,  66,  77,  88,  99,  100,  111, 222, 333,
//	444, 555, 666, 777,
//
//	888, 999, 1000,
//];
//var splitters = [
//	//1,
//	44,
//	888,
//];
//}

var data = fs.readFileSync('./emoj.out').toString().trim().split('\n');
var splitters = fs.readFileSync('./splitter.out').toString().trim().split('\n');
// a.out emoj.out js.js 

console.log(splitWithSplitters(data, splitters, 9));
// → [
//   [1,2,3,4,5,6,7,8,9,0],
//   [11,22,33],
//   [44,55,66,77,88,99,0,111,222,333],
//   [444,555,666,777],
//   [888,999,0]
// ]
