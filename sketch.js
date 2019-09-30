let values = [];
let loops = 0;
let j = 0;
let numLines = 200;
let speed;
let counter = 1;
let userInput;
let firstTime = true;
let sorting = false;
let text;

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
	setSpeed(sel.value());
	document.getElementById('num-of-lines').innerHTML = numLines;
	for (i = 0; i < numLines; i++) {
		values[i] = random(height);
	}
	renderLines(values);
}

function draw() {
	background(0);

	if (firstTime == true) {
		renderLines(values);
	} else {
		bubbleSort(values);
		renderLines(values);
		sorting = true;
	}
}

// ============================================
// ============= Custom Functions =============
// ============================================

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

// Swap function for bubble sort
function swap(arr, a, b) {
	let temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
}

function renderLines(arr) {
	for (let i = 0; i < arr.length; i++) {
		let col = color(arr[i], height, height);
		let location = map(i, 0, arr.length, 0, width);
		stroke('black');
		fill(col);
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

	// Create Selection Box
	sel = createSelect();
	sel.parent('input-div');
	sel.class('select');
	sel.option('One Step');
	sel.option('Slow');
	sel.option('Medium');
	sel.option('Fast');
	sel.option('Fastest');
	sel.changed(changeSpeed);

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
	setSpeed(sel.value());
}

function resetAnimation() {
	// If First time through, just start sort from current values
	if (firstTime == true) {
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
		setSpeed(sel.value());
		for (i = 0; i < numLines; i++) {
			values[i] = random(height);
			//values[i] = noise(i/100.0)*height;
		}
		draw();
	}
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
