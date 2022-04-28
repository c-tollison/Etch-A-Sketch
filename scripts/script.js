const GRID_SIZE = 500;
const MAX_RGB = 256;
const slider = document.querySelector(".slider");
const clear = document.querySelector("#clear");
const colorPicker = document.querySelector(".color");
const colorButton = document.querySelector("#colorButton");
const rainbowButton = document.querySelector("#rainbowButton");
const eraserButton = document.querySelector("#eraserButton");
let colorButtonActive = true;
let rainbowButtonActive = false;
let eraserButtonActive = false;

slider.addEventListener("change", () => {
	removeGrid();
	addGrid(slider.value);
	setBlockListeners();
});
clear.addEventListener("click", () => {
	clearGrid(slider.value);
});
colorButton.addEventListener("click", () => {
	rainbowButton.classList.remove("active");
	eraserButton.classList.remove("active");
	colorButton.classList.add("active");
	colorButtonActive = true;
	rainbowButtonActive = false;
	eraserButtonActive = false;
});
rainbowButton.addEventListener("click", () => {
	rainbowButton.classList.add("active");
	eraserButton.classList.remove("active");
	colorButton.classList.remove("active");
	colorButtonActive = false;
	rainbowButtonActive = true;
	eraserButtonActive = false;
});
eraserButton.addEventListener("click", () => {
	rainbowButton.classList.remove("active");
	eraserButton.classList.add("active");
	colorButton.classList.remove("active");
	colorButtonActive = false;
	rainbowButtonActive = false;
	eraserButtonActive = true;
});

/**
 * Updates the inner HTML of the gridSize display to the value
 * of the slider
 *
 * @param {number} sliderValue  The value of the input slider
 */
function showVal(sliderValue) {
	document.querySelector(
		"#gridSize"
	).innerHTML = `${sliderValue} x ${sliderValue}`;
}

/**
 * Adds elements to the board based on the size given
 * by the slider. Grid is size (numberBlocks) * (numberBlocks)
 *
 * @param {number} numberBlocks The number of blocks in a row
 */
function addGrid(numberBlocks) {
	let grid = document.querySelector(".grid");
	//Number of rows to add
	for (let i = 0; i < numberBlocks; i++) {
		//number of columns to add
		for (let j = 0; j < numberBlocks; j++) {
			let block = document.createElement("div");
			block.classList.add("visible");
			let dimensions = GRID_SIZE / numberBlocks;
			block.style.cssText += `width: ${dimensions}px;`;
			block.style.cssText += `height: ${dimensions}px;`;
			//adds new block inside of grid
			grid.appendChild(block);
		}
	}
}

/**
 * Removes all elements from the grid
 */
function removeGrid() {
	let grid = document.querySelector(".grid");
	//Repeats while there is a first child in the grid
	while (grid.firstChild) {
		grid.removeChild(grid.firstChild);
	}
}

/**
 * This will add event listeners to all blocks so that when
 * a hover occurs a block will change
 */
function setBlockListeners() {
	//selects all blocks on the page
	let blocks = document.querySelectorAll(".visible");
	blocks.forEach((block) => {
		block.addEventListener("mouseover", () => {
			//changes the block to whatever value is chosen
			changeBlock(block);
		});
	});
}

/**
 * This will clear the grid by setting all divs to white
 *
 * @param {number} numberBlocks number of blocks in rows and columns
 */
function clearGrid(numberBlocks) {
	let blocks = document.querySelectorAll(".visible");
	let dimensions = numberBlocks * numberBlocks;
	//loop through all grid points and turn white
	for (let i = 0; i < dimensions; i++) {
		blocks[i].style.cssText += "background-color: white;";
	}
}

/**
 * This will change the block based on the type of button is selected
 * on the screen
 *
 * @param {element} block element in grid that value is being changed
 */
function changeBlock(block) {
	if (colorButtonActive) {
		block.style.cssText += `background-color: ${colorPicker.value};`;
	} else if (rainbowButtonActive) {
		block.style.cssText += `background-color: ${generateRandomColor()};`;
	} else if (eraserButtonActive) {
		block.style.cssText += `background-color: white;`;
	}
}

/**
 * Generates a random string of colors in rgb format
 *
 * @returns {string} a random color in format "rgb(#,#,#)"
 */
let generateRandomColor = () => {
	let red = Math.floor(Math.random() * MAX_RGB);
	let green = Math.floor(Math.random() * MAX_RGB);
	let blue = Math.floor(Math.random() * MAX_RGB);

	return `rgb(${red},${green},${blue})`;
};

window.onload = () => {
	addGrid(40);
	setBlockListeners();
};
