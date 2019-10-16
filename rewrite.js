let values = [];
let loops = 0;
let j = 0;
let numLines;
let speed;
let firstTime = true;
let sorting = false;
let algorithm = 'quick';

let states = [];

function setup() {
	let cnv = createCanvas(1280, 500);
	cnv.parent('canvas-container');

	colorMode(HSB, height);

	let val = document.getElementById('myRange').value;
	numLines = val;
	setSpeed();
	// Generate 'numLines' amount of lines with random heights
	populateValues();
}

function draw() {
	background(100);
	// Draws the lines to the screen every frame
	generateLines();
}

// ============================================
// ============== Support Functions ==============
// ============================================

function populateValues() {
	for (i = 0; i < numLines; i++) {
		values[i] = random(height);
		states[i] = -1;
	}
}

function generateLines() {
	// Tell p5.js to render them to the screen.
	for (let i = 0; i < values.length; i++) {
		let col = color(values[i], height, height);
		stroke('white');
		fill(col);
		let location = map(i, 0, values.length, 0, width);
		rect(location, height - values[i], width / numLines, height);
		// stroke('black');
		// if (states[i] == 0) {
		// 	fill('lightgreen');
		// } else if (states[i] == 1) {
		// 	fill('coral');
		// } else {
		// 	fill(col);
		// }
		// // let col = color(arr[i], height, height);
		// let location = map(i, 0, values.length, 0, width);
		// // fill('lightblue');
		// stroke('black');
		// rect(location, height - values[i], width / numLines, height);
	}
}

async function startAnimation() {
	if (sorting) {
		console.log('Wait for previous sort to finish...');
	} else {
		if (firstTime == false) {
			resetAnimation();
		}
		let algo = document.getElementById('algorithm').value;
		// let algo = document.getElementById('algo');
		// console.log(algo.value);
		if (algo === 'hoare') {
			sorting = true;
			console.log(
				'Starting Hoare Quicksort... Sorting ' + numLines + ' lines.'
			);
			await quickHoareSort(values, 0, values.length - 1);
			sorting = false;
			firstTime = true;
			console.log('Finished Hoare Quicksort! Sorted ' + numLines + ' lines.');
		} else if (algo === 'lomuto') {
			sorting = true;
			console.log(
				'Starting Lomuto Quicksort... Sorting ' + numLines + ' lines.'
			);
			await quickSort(values, 0, values.length - 1);
			sorting = false;
			firstTime = true;
			console.log('Finished Lomuto Quicksort! Sorted ' + numLines + ' lines.');
		}
	}
}

function resetAnimation() {
	// Set All Values to Default
	// if (sorting) {
	// 	console.log('Wait for previous sort to finish...');
	// } else {
	let val = document.getElementById('myRange').value;
	let speedInput = document.getElementById('speed-box').value;
	numLines = val;
	values = [];
	loops = 0;
	j = 0;
	setSpeed();
	firstTime = true;
	sorting = false;
	states = [];
	// Repopulate Values
	populateValues();
	// }
}

function updateSliderInput() {
	let val = document.getElementById('myRange').value;
	if (sorting) {
		document.getElementById('slideCounter').innerHTML = val;
	} else {
		document.getElementById('slideCounter').innerHTML = val;
		values = [];
		numLines = val;
		populateValues();
		generateLines();
	}
}

function setSpeed() {
	let speedInput = document.getElementById('speed-box').value;
	if (document.getElementById('algorithm') === 'bubble') {
		if (speedInput === 'one') {
			speed = 1;
		} else if (speedInput === 'slow') {
			speed = 5;
		} else if (speedInput === 'medium') {
			speed = 30;
		} else if (speedInput === 'fast') {
			speed = 60;
		} else {
			speed = 500;
		}
	} else {
		if (speedInput === 'one') {
			speed = 150;
		} else if (speedInput === 'slow') {
			speed = 75;
		} else if (speedInput === 'medium') {
			speed = 25;
		} else if (speedInput === 'fast') {
			speed = 10;
		} else {
			speed = 1;
		}
	}
}

// ============================================
// ============== Sort Functions ==============
// ============================================

// Quick Sort
async function quickSort(arr, start, end) {
	if (start >= end) {
		return;
	}

	let pi = await lomutoPartition(arr, start, end);
	states[pi] = -1;

	await Promise.all([
		await quickSort(arr, start, pi - 1),
		await quickSort(arr, pi + 1, end)
	]);

	// await quickSort(arr, start, pi - 1);
	// await quickSort(arr, pi + 1, end);
}

async function lomutoPartition(arr, start, end) {
	for (let i = start; i < end + 1; i++) {
		states[i] = 1;
	}

	let pivotValue = arr[end];
	let pivotIndex = start;
	states[pivotIndex] = 0;
	for (let i = start; i < end; i++) {
		if (arr[i] < pivotValue) {
			await Swap(arr, i, pivotIndex);
			states[pivotIndex] = -1;
			pivotIndex++;
			states[pivotIndex] = 0;
		}
	}

	await Swap(arr, pivotIndex, end);
	for (let i = start; i < end + 1; i++) {
		if (i != pivotIndex) {
			states[i] = -1;
		}
	}
	return pivotIndex;
}

// Swap function for sorts
async function Swap(arr, a, b) {
	await sleep(speed);
	let temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
}

async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// Quick Sort
async function quickHoareSort(arr, start, end) {
	if (start >= end) {
		return;
	}

	Math.pow(2);
	let pivotValue = arr[Math.floor((start + end) / 2)];
	let pivot = await hoarePartition(arr, start, end, pivotValue);

	await Promise.all([
		await quickHoareSort(arr, start, pivot - 1),
		await quickHoareSort(arr, pivot, end)
	]);

	return arr;
}

// Quick Sort Partition

async function hoarePartition(arr, start, end, pivotValue) {
	while (start <= end) {
		while (arr[start] < pivotValue && start <= end) {
			start++;
		}
		while (arr[end] > pivotValue) {
			end--;
		}
		if (start <= end) {
			await Swap(arr, start, end);
			start++;
			end--;
		}
	}
	return start;
}

// Merge Sort
// mergeSort() seperates array into halves recursivly until elements are in single arrays.
// Then, merge() compares those two arrays to see which is larger
// Finally, merge() combines elements into single list recursively
function mergeSort(arr, start, end) {
	if (arr.length <= 1) return;
	if (start < end) return;

	let middle = Math.floor((start + end) / 2);

	left = arr.slice(0, mid - 1);
	right = arr.slice(mid);

	mergeSort(arr, start, middle - 1);
	mergeSort(arr, middle, end);

	return merge(arr, start, middle, end);
}

function merge(arr, start, middle, end) {
	// Grab lengths of both 'partitions'
	let a1 = middle - 1 - start;
	let a2 = end - middle;
}

// Bubble Sort
function bubbleSort(arr) {
	// Tells many times needed to loop
	if (loops < arr.length) {
		// Actually looping through the array and swaping when needed
		if (j < arr.length - loops - 1) {
			// How many swaps to do before rendering a new line in p5.js

			for (i = 0; i < speed; i++) {
				if (arr[j] > arr[j + 1]) {
					swap(arr, j, j + 1);
				}
				j++;
			}
		} else {
			j = 0;
			loops++;
		}
	} else {
	}
}
