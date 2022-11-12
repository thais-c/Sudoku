const FILTER_BOARDS = [
  [
    [0, 1, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 1, 0, 0, 0, 0],
  ],
  [
    [0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 0, 0, 1, 0],
  ],
  [
    [1, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 1, 0, 1, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 0, 1, 0],
  ],
];

// Show errors on page
var totalErrors = 0;
var filterId = getFilterRandomNumber();
var solution = [];

// List of html element boxes
var grid = [];
var gridElement = document.getElementById("grid");
var calculatingElement = document.getElementById("calculating");
var calculatingTryElement = document.getElementById("calculating-counter");
var errorElement = document.getElementById("error");
var boardSizeElement = document.getElementById("board-size");
var gridBoxesCols = null;
var gridBoxesRows = null;
var boxCols = 3;
var boxRows = 3;
var calculatingTry = 0;

function getFilterRandomNumber() {
  // Get a random number between 0 and 2
  return Math.floor(Math.random() * 2);
}

function getRandomArray() {
  // New empty array
  var numbers = []; 

  var min, max, length, randomNumber, isDuplicated;
  
  // Limits of the random numbers
  min = 1;
  max = 9;
  // How many numbers you want to extract
  length = 9; 
  
  for (let number = 0; number < length; number++) {
    do {
      // Get a random number inside the min and max
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      // Check if the random number is already in the list
      isDuplicated = numbers.includes(randomNumber);
      // If not in the list, then add it
      if(!isDuplicated){
        numbers.push(randomNumber);
      }
    }
    // Keep doing the loop until the random number is not duplicated
    while(isDuplicated);
  }

  // Return the list
  return numbers;
}

function addError() {
  // Increment the errors counter
  totalErrors++;
  // Update the html element with the new value
  document.getElementById("errors").innerHTML = totalErrors;
}

function checkNumber(inputNumber, htmlElement) {
  // Get the data-value attribute from the html element
  var celNumber = htmlElement.getAttribute("data-value");

  // If inputNumber is not empty or null
  if (!!inputNumber) {
    // Check if the two numbers are equal
    if (celNumber == inputNumber) {
      // if so, set the value to the html element, and add the class "correct" to the html element
      htmlElement.innerHTML = celNumber;
      htmlElement.disabled = true;
      htmlElement.classList.remove("bg-danger");
      htmlElement.classList.add("bg-success");
    } else {
      // if not, call addError method and add the class "error" to the html element
      htmlElement.classList.remove("bg-success");
      htmlElement.classList.add("bg-danger");
      addError();
    }
  } else {
    // If the input is empty, remove the class "correct" and "error" from the html element
    htmlElement.classList.remove("bg-danger");
    htmlElement.classList.remove("bg-success");
  }
}

function createBoxElement() {
  var box = document.createElement("div");
  box.classList.add("box");
  box.setAttribute("style", "width: " + (100 / gridBoxesCols) + "%; height: " + (100 / gridBoxesRows) + "%;");
  return box;
}

function createCelElement(box, cel, randomNumber) {
  var celElement = document.createElement("div");
  celElement.classList.add("cel");
  celElement.append(createInputElement(box, cel, randomNumber));
  return celElement;
}

function createInputElement(box, cel, randomNumber) {
  var input = document.createElement("input");
  input.setAttribute("type", "number");
  input.setAttribute("data-value", randomNumber);
  input.value = FILTER_BOARDS[filterId][box - 1][cel - 1] === 1 ? randomNumber : "";
  input.addEventListener("input", function (event) {
    checkNumber(event.data, event.target);
  }, false);
  return input;
}

function initCel(cel, box, randomNumber, gridElement) {
  // Creates the new cel object with cel id number, random value and the html input element
  var celValue = {
    id: cel,
    value: randomNumber,
    element: createCelElement(box, cel, randomNumber),
  };

  gridElement.append(celValue.element)
  // return the new cel object to the caller
  return celValue;
}

function initBox(box) {
  // List of cels for each box
  var cels = [];
  var boxElement = createBoxElement(box);
  
  // Loop for each cel...
  for (var cel = 1; cel < ((boxCols * boxRows) + 1); cel++) {
    var boxRow = Math.floor((box - 1) / gridBoxesCols);
    var boxCol = (box - 1) % gridBoxesCols;
    var row = Math.floor((cel - 1) / boxCols) + (boxRow * boxRows);
    var col = (cel - 1) % boxCols + (boxCol * boxCols); 
    var value = solution[row][col];
    var newCel = initCel(cel, box, value, boxElement);
    cels.push(newCel);
  }

  gridElement.append(boxElement);

  return {
    id: box,
    cels: cels,
  };
}

function initBoard() {
  // Loop for each box...
  for (var box = 1; box < ((gridBoxesCols * gridBoxesRows) + 1); box++) {
    // box 1
    var newBox = initBox(box);
    // Add box to the grid list
    grid.push(newBox);
  }
}

function getCurrentRowNumbers(rowNumber) {
  return solution[rowNumber] || [];
}

function getCurrentColumnNumbers(columnNumber) {
  var column = [];
  for (var row = 0; row < solution.length; row++) {
    var currentColumn = solution[row][columnNumber];
    
    if (currentColumn) {
      column.push(currentColumn);
    }
  }
  return column;
}

function filterBoxList(list, start) {
  return [...list].filter((number, index) => index >= start && index < start + boxRows);
}

function getCurrentBoxNumbers(rowNumber, columnNumber) {
  var rowOffset = Math.floor(rowNumber / boxRows);
  var colOffset = Math.floor(columnNumber / boxCols); // offset from box to box in the grid
  var boxNumber = (rowOffset * gridBoxesCols) + colOffset;
  var columnOne = (boxNumber % gridBoxesCols) * boxCols;
  var rowOne = Math.floor(boxNumber / gridBoxesCols) * boxCols;
  var boxColumnNumbers = [];
  var boxRowNumbers = [];

  for (var i = 0; i < boxCols; i++) {
    var currentCol = getCurrentColumnNumbers(columnOne + i);
    boxColumnNumbers.push(...filterBoxList(currentCol, rowOne));
  }

  for (var i = 0; i < boxRows; i++) {
    var currentRow = getCurrentRowNumbers(rowOne + i);
    boxRowNumbers.push(...filterBoxList(currentRow, columnOne));
  }
  
  return [...boxColumnNumbers, ...boxRowNumbers];
}

function populateGrid() {
  solution = [];
  var aTable = solution;
  // loop for rows/lines
  for (var row = 0; row < (gridBoxesRows * boxRows); row++) {
    solution.push([]);
    var rowList = solution[row];
    // list of randomm numbers for the columns
    var randomList = getRandomArray();

    // loop for columns
    for (var col = 0; col < (gridBoxesCols * boxCols); col++) {

      // condition only for the ROW 0, the numbers are random
      if (row === 0) {
        var randomNumber = randomList.pop();
        rowList.push(randomNumber);
      } else {
        // condition for all the ROWS FROM 1 TO 8
        // get the number from the previous row
        var currentRowNumbers = getCurrentRowNumbers(row);
        // get the number from the previous column
        var currentColumnNumbers = getCurrentColumnNumbers(col);
        // get the number from the previous box
        var currentBoxNumbers = getCurrentBoxNumbers(row, col);
        var currentNumbers = [...currentRowNumbers, ...currentColumnNumbers, ...currentBoxNumbers];
        var takenNumbers = new Set(currentNumbers);
        var availableNumbers = randomList.filter(number => !takenNumbers.has(number));
        var randomNumber = availableNumbers.pop();
        randomList = randomList.filter(number => number !== randomNumber);
        rowList.push(randomNumber);
        console.log('test ', solution);
      }
    }
  }
}

function validateGrid() {
  for(var i = 0; i < (gridBoxesRows * boxRows); i++) {
    var row = solution[i];
    var rowSet = new Set(row);
    if (rowSet.has(undefined)) {
      return false;
    }
  }
  return true;
}

function initGame(cols, rows) {
   gridBoxesCols = cols;
   gridBoxesRows = rows;
   var isValid = false;
   calculatingElement.removeAttribute("hidden");
   boardSizeElement.setAttribute("hidden", true);

   setTimeout(function () {

    for(var i = 0; i < 1000; i++) {
      calculatingTryElement.innerHTML = i;

      populateGrid();
      isValid = validateGrid();
      
      if(isValid) {
        console.log('sucesso ', i, solution);
        initBoard();
        break;
      }
    }
    if (!isValid) {
        console.log('erro ', solution);
        errorElement.removeAttribute("hidden");
    }
    calculatingElement.setAttribute("hidden", true);
    }, 100);
}

function restart() {
  window.location.reload();
}