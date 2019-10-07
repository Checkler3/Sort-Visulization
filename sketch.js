let values = [];
let loops = 0;
let j = 0;
let numLines = 50;
let speed;
let counter = 1;
let userInput;
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
	// numLines = slider.value();
	numLines = 50;
	setSpeed(selSpeed.value());
	document.getElementById('num-of-lines').innerHTML = numLines;
	for (i = 0; i < numLines; i++) {
		values[i] = random(height);
		states[i] = -1;
	}
	renderLines(values);

	quickSort(values, 0, values.length - 1);
}

function draw() {
	background(0);

	if (firstTime == true) {
		renderLines(values);
		// quickSort(values, 0, values.length - 1);

		// renderLines(values);
	} else {
		// quickSort(values, 0, values.length - 1);
		bubbleSort(values);
		renderLines(values);
		sorting = true;
	}
}

// ============================================
// ============= Custom Functions =============
// ============================================

// ==== Sort Functions ====

// Bubble Sort
function bubbleSort(arr) {
	sorting = true;
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
			// ===== Console Checking ===== //
			// console.log(counter + ' passes complete, restarting');
			// counter++;
			// ===== Console Checking ===== //
			j = 0;
			loops++;
		}
	} else {
		console.log('finish');
	}
}

// Quick Sort
async function quickSort(arr, start, end) {
	if (start >= end) {
		return;
	}
	let pi = await partition(arr, start, end);

	await Promise.all([
		await quickSort(arr, start, pi - 1),
		await quickSort(arr, pi + 1, end)
	]);

	// await quickSort(arr, start, pi - 1);
	// await quickSort(arr, pi + 1, end);
}

// Quick Sort Partition

async function partition(arr, start, end) {
	let pivotValue = arr[end];
	let pivotIndex = start;
	for (let i = start; i < end; i++) {
		if (arr[i] < pivotValue) {
			await swap(arr, i, pivotIndex);
			pivotIndex++;
		}
	}

	await swap(arr, pivotIndex, end);
	return pivotIndex;
}

// ==== Support Functions ====

// Swap function for sorts
async function swap(arr, a, b) {
	await sleep(10);
	let temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function renderLines(arr) {
	for (let i = 0; i < arr.length; i++) {
		let col = color(arr[i], height, height);
		let location = map(i, 0, arr.length, 0, width);
		if (states[i] === 1) {
			fill('white');
		} else {
			fill(col);
		}
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
	selAlgo.option('Quick Sort');
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
}

function resetAnimation() {
	// If First time through, just start sort from current values
	if (firstTime == true) {
		// quickSort(values, 0, values.length - 1);
		bubbleSort(values);
		firstTime = false;
		sorting = true;
		// If not first time, reset values to default and call draw
	} else {
		values = [];
		loops = 0;
		j = 0;
		numLines = slider.value();
		speed = 100;
		counter = 1;
		setSpeed(selSpeed.value());
		for (i = 0; i < numLines; i++) {
			values[i] = random(height);
			//values[i] = noise(i/100.0)*height;
		}
		// renderLines();
		// quickSort(values, 0, values.length - 1);
		draw();
	}
}
