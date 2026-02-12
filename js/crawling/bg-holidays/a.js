#!/usr/bin/env node

//var fetch = require('node-fetch');
var { JSDOM } = require('jsdom');


//var HOLIDAYS_URL = 'https://pochivnidni.bg/2025/'
var HOLIDAYS_URL = 'https://почивнидни.com/pochivnidni2025.html'



void async function fetchAndParse(url) {
	try {
		var response = await fetch(url);
		var html = await response.text();

		var dom = new JSDOM(html);
		var document = dom.window.document;
	} catch (error) {
		console.error("Error fetch/parsing:", error);
	}

	var elParent = document.getElementById("content");

	elParent.querySelector('#whereami').remove();


	//ai:
	var result = { h1: null, arr: [] };

	function addToSubarray(node) {
		let subarr;
		if (typeof result.arr[result.arr.length-1] === 'object') {
				subarr = result.arr[result.arr.length-1];
		} else {
			subarr = [];
			result.arr.push(subarr);
		}

		subarr.push(node.textContent.trim());
		//return 1;
	}

	// TODO:! .textContent for example in DIV will give the text and content withing <script> and other elements
	// .innerText does not work with this jsdom,
	// possible solution: eather find other package or write fn that gives the text without invincible elementss (as would be from .innerText) 

	// return is how many have been added by that element. var traversedCount
	function traverse(node) {
		//if (node.nodeType == 1) {
		if (node.nodeType === dom.window.Node.ELEMENT_NODE) {
			// Element node, ok -> main
		} else if (node.nodeType === dom.window.Node.TEXT_NODE) {
			addToSubarray(node);
			return 1;
		}

		if (["META", "SCRIPT", "STYLE", "LINK",  "HEAD", "TITLE",  'BR'].includes(node.tagName)) {
			console.log('note: scipping tag: '+ node.tagName);
			return false;
			// false when should not add, neather should add its childer
			// 0 is when nothing to add
		} else if (node.tagName === "H1") {
			result.h1 = node.textContent;
			return 1;
		} else if (node.tagName === "P") {
			result.arr.push(node.textContent);
			return 1;
		} else if (node.tagName === "TABLE") {
			let tableArr = [];
			result.arr.push(tableArr);

			for (let row of node.rows) {
				let rowArr = [];
				tableArr.push(rowArr);

				for (let cell of row.cells) {
					let cellSelector;
					cellSelector =
						`${
							cell.tagName.toLowerCase()
						}${
							Array.from(cell.classList)
							.map(cls => `.${cls}`).join('')
						}${
							Array.from(cell.attributes)
							.filter(attr => attr.name !== "class") // Exclude the class attribute
							.map(attr => `[${attr.name}=${JSON.stringify(attr.value)}]`)
							.join('')
						}`
					;


					rowArr.push([cell.textContent, cellSelector]);
				}
			}
			return 1; // NOTE! (technically wrong, but leave it like this for now.) but its one upper array
		} else if ( [
			"SPAN", "A", "B", "I", "EM", "STRONG", "U", "SMALL", "MARK", "SUB", "SUP",
			//"TD", "TH",
		].includes(node.tagName) ) {
			addToSubarray(node);
			return 1;
		}

		console.info(`note, traversing in tag: ${node.tagName}`);
		//node.childNodes.forEach(traverse);
		var traversedCount = [].reduce.call( node.childNodes, (acc, cur) => acc + traverse(cur), 0 );
		if (traversedCount === 0) { // note: `false` will not pass this if, false is when it should not be added
			console.log(`note: adding ${node.tagName} as only parent`);
			addToSubarray(node);
			//traversedCount += 1;
			traversedCount = 1;
		}

		console.info(`note, traversed in tag: ${node.tagName}`);

		return traversedCount;
	}

	debugger
	//var traversedCount = elParent.childNodes.forEach(traverse);
	var traversedCount = traverse(elParent);

	console.log(`total 	traversedCount: ${traversedCount}`);

	var fs = require('fs');
	fs.writeFileSync('./result.json', JSON.stringify(result, null, '\t'), 'utf-8');










	// // TEST {
	// if (el) {
	// 	console.log("Element found:", el.textContent);
	// } else {
	// 	console.log("Element not found.");
	// }
	// // }
} (HOLIDAYS_URL);



