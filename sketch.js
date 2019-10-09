let values = [];
let loops = 0;
let j = 0;
let numLines = 50;
let speed;
let counter = 1;
let firstTime = true;
let sorting = false;
let text;

let states = [];

// ===========================================
// ============= p5.js Functions =============
// ===========================================

function setup() {
	let cnv = createCanvas(1280, 500);
	cnv.parent('canvas-container');

	//Initial setup

	renderInput();
	colorMode(HSB, height);
	numLines = slider.value();
	speed = 25;
	document.getElementById('num-of-lines').innerHTML = numLines;
	for (i = 0; i < numLines; i++) {
		values[i] = random(height);
		states[i] = -1;
	}
	renderLines(values);
	// quickSort(values, 0, values.length - 1);
}

function draw() {
	background(100);
	renderLines(values);

	if (firstTime) {
	} else if (selAlgo.value() === 'Bubble Sort') {
		bubbleSort(values);
	}
}

// ============================================
// ============= Custom Functions =============
// ============================================

// ==== Sort Functions ====

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

// Quick Sort
async function quickSort(arr, start, end) {
	console.log('Entered Quick Sort');
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
			await lomutoSwap(arr, i, pivotIndex);
			states[pivotIndex] = -1;
			pivotIndex++;
			states[pivotIndex] = 0;
		}
	}

	await lomutoSwap(arr, pivotIndex, end);
	for (let i = start; i < end + 1; i++) {
		if (i != pivotIndex) {
			states[i] = -1;
		}
	}
	return pivotIndex;
}

// Quick Sort
function quickHoareSort(arr, start, end) {
	console.log('called quickHoareSort');
	if (start >= end) {
		return;
	}
	let pivot = hoarePartition(arr, start, end);

	if (start < pivot - 1) {
		quickHoareSort(arr, start, pivot - 1);
		console.log('called quickHoareSort');
	}

	if (end > pivot) {
		quickHoareSort(arr, pivot, end);
	}

	return arr;

	// await quickSort(arr, start, pi - 1);
	// await quickSort(arr, pi + 1, end);
}

// Quick Sort Partition

function hoarePartition(arr, start, end) {
	let pivotValue = Math.floor((start + end) / 2);

	while (start < end) {
		while (arr[start] < pivotValue) {
			start++;
		}
		while (arr[end] > pivotValue) {
			end--;
		}
		if (start <= end) {
			swap(arr, start, end);
			start++;
			end--;
		}
	}
	return start;
}

// ==== Support Functions ====

async function swap(arr, a, b) {
	let temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
}

// Swap function for sorts
async function lomutoSwap(arr, a, b) {
	await sleep(speed);
	let temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
}

async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function renderLines(arr) {
	for (let i = 0; i < arr.length; i++) {
		stroke('black');
		if (states[i] == 0) {
			fill('red');
		} else if (states[i] == 1) {
			fill('coral');
		} else {
			fill('white');
		}
		// let col = color(arr[i], height, height);
		let location = map(i, 0, arr.length, 0, width);
		// fill('lightblue');
		stroke('black');
		rect(location, height - arr[i], width / numLines, height);
	}
}

function renderInput() {
	// Create Slider
	let numOfLinesText = createSpan('Number of Lines: ');
	let numOfLines = createSpan();
	numOfLinesText.parent('info-text');
	numOfLines.parent('info-text');
	numOfLines.id('num-of-lines');
	slider = createSlider(10, 500, 200, 5);
	slider.parent('input-div');
	slider.class('slider');

	slider.input(changeLines);

	// Create selSpeedection Box for Speed
	selSpeed = createSelect();
	selSpeed.parent('input-div');
	selSpeed.class('selectSpeed');
	selSpeed.option('One Step');
	selSpeed.option('Slow');
	selSpeed.option('Medium');
	selSpeed.option('Fast');
	selSpeed.option('Fastest');
	selSpeed.changed(changeSpeed);

	// Create selSpeedection Box for Algorithm
	selAlgo = createSelect();
	selAlgo.parent('input-div');
	selAlgo.class('selAlgo');
	selAlgo.option('Bubble Sort');
	selAlgo.option('Quick Sort (Lomuto)');
	selAlgo.option('Quick Sort (Hoare)');
	// selAlgo.changed(changeAlgorithm);

	// Create Reset Button
	button = createButton('Go!');
	button.mousePressed(resetAnimation);
	button.parent('input-div');
	button.class('btn');
}

function changeLines() {
	if (sorting) {
		document.getElementById('num-of-lines').innerHTML = slider.value();
	} else {
		values = [];
		numLines = slider.value();
		document.getElementById('num-of-lines').innerHTML = numLines;
		for (i = 0; i < numLines; i++) {
			values[i] = random(height);
		}
		renderLines(values);
	}
}

function changeSpeed() {
	setSpeed(selSpeed.value());
}

function setSpeed(value) {
	if (selAlgo.value() === 'Bubble Sort') {
		if (value === 'One Step') {
			speed = 1;
		} else if (value === 'Slow') {
			speed = 5;
		} else if (value === 'Medium') {
			speed = 30;
		} else if (value === 'Fast') {
			speed = 60;
		} else {
			speed = 500;
		}
	} else {
		if (value === 'One Step') {
			speed = 100;
		} else if (value === 'Slow') {
			speed = 75;
		} else if (value === 'Medium') {
			speed = 25;
		} else if (value === 'Fast') {
			speed = 10;
		} else {
			speed = 1;
		}
	}
}

function resetAnimation() {
	console.log('Clicked Reset');
	// If First time through, just start sort from current values
	if (firstTime == true) {
		let algo = selAlgo.value();
		if (algo === 'Quick Sort (Lomuto)') {
			console.log('Initializing Quick Sort (Lomuto)');
			quickSort(values, 0, values.length - 1);
		} else {
			console.log('Initializing Bubble Sort');
			bubbleSort(values);
		}
		firstTime = false;
		sorting = false;
		// If not first time, reset values to default and call draw
	} else {
		console.log('Resetting values...');
		values = [];
		loops = 0;
		j = 0;
		numLines = slider.value();
		speed = 100;
		counter = 1;
		setSpeed(selSpeed.value());
		for (i = 0; i < numLines; i++) {
			values[i] = random(height);
		}
		console.log('Get Algorithm from selection box');
		let algo = selAlgo.value();
		if (algo === 'Quick Sort (Lomuto)') {
			console.log('Initializing Quick Sort (Lomuto)');
			quickSort(values, 0, values.length - 1);
		} else {
			console.log('Initializing Bubble Sort');
			bubbleSort(values);
		}
		draw();
		// renderLines(values);
		// bubbleSort(values);
		// quickSort(values, 0, values.length - 1);
	}
}
