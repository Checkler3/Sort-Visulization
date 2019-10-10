let values = [];
let loops = 0;
let j = 0;
let numLines = 50;
let speed;
let firstTime = true;
let sorting = false;

let states = [];

function setup() {
	let cnv = createCanvas(1280, 500);
	cnv.parent('canvas-container');

	// Generate 'numLines' amount of lines with random heights
	for (i = 0; i < numLines; i++) {
		values[i] = random(height);
		states[i] = -1;
	}
}

function draw() {
	background(100);
	generateLines();
}

function generateLines() {
	// Tell p5.js to render them to the screen.
	for (let i = 0; i < values.length; i++) {
		stroke('black');
		if (states[i] == 0) {
			fill('lightgreen');
		} else if (states[i] == 1) {
			fill('coral');
		} else {
			fill('white');
		}
		// let col = color(arr[i], height, height);
		let location = map(i, 0, values.length, 0, width);
		// fill('lightblue');
		stroke('black');
		rect(location, height - values[i], width / numLines, height);
	}
}

function renderInput() {
	// Create Reset Button
	button = createButton('Go!');
	button.mousePressed(startAnimation);
	button.parent('info-text');
	button.class('btn');
}

function startAnimation() {
	quickSort(values, 0, values.length - 1);
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

// Swap function for sorts
async function lomutoSwap(arr, a, b) {
	await sleep(1);
	let temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
}

async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
