//works as a filter - true and false. 0=false, 1=true. We run the game and randomly we get one of these boards. 
//Where is 0= false we don't show the number and where is 1 = the number is showed
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
//Get a random N. Get the Filter_Boards. Return 0 - 2 bc there are 3 boards
var filterId = getFilterRandomNumber(); 
//Random value list. This is the result. This variable will contain the random N that solves the Grid
var solution = [];

// List of html element boxes
var grid = [];
//variables with the HTML elements manipulated by the game
var gridElement = document.getElementById("grid");
var calculatingElement = document.getElementById("calculating");
var calculatingTryElement = document.getElementById("calculating-counter");
var errorElement = document.getElementById("error");
var boardSizeElement = document.getElementById("board-size");
//Game variables. How many columns of boxes the game will have, how many rows of boxes the game will have
var gridBoxesCols = null;
var gridBoxesRows = null;
//definition of rows and columns by box
var boxCols = 3;
var boxRows = 3;
//how many times it caculates possible solutions without success (solutions that have undefinied numbers)
var calculatingTry = 0;

//It takes the possible filter to hide the board solution (FILTER_BOARDS has three filters, the random number must be 0-2)
function getFilterRandomNumber() {
  // Get a random number between 0 and 2
  return Math.floor(Math.random() * 2);
}

//returns a list of random numbers from 0 - 9 to fill each grid line
function getRandomArray() {
  // New empty array
  var numbers = []; 

  var min, max, length, randomNumber, isDuplicated;
  
  // Limits of the random numbers
  min = 1;
  max = 9;
  // How many numbers you want to extract
  length = 9; 
  
  // loop through 0-9 checking if the random number generated is already in the number list, if not than add to the list
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

//updates the screen when a new error happens with the total errors
function addError() {
  // Increment the errors counter
  totalErrors++;
  // Update the html element with the new value
  document.getElementById("errors").innerHTML = totalErrors;
}

//the function will check if the typed number by the user is the same as the solution in the HTML element, if yes - correct if not error
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

//creates a HTML element with a Box to add to the grid. (Creates the box)
function createBoxElement() {
  //creates a new div 
  var box = document.createElement("div");
  //add class box to the div
  box.classList.add("box");
  //add 2 styles : width and height in % based in the number of N of gridboxes and N of grid rows
  box.setAttribute("style", "width: " + (100 / gridBoxesCols) + "%; height: " + (100 / gridBoxesRows) + "%;");
  return box;
}

//creates a HTML element with Cel to add to the grid
function createCelElement(box, cel, randomNumber) {
  //creates a new div 
  var celElement = document.createElement("div");
  //add class cel to the div
  celElement.classList.add("cel");
  //add the HTML element for the input passing the box and cel position and the random value for the input
  celElement.append(createInputElement(box, cel, randomNumber));
  return celElement;
}

//the randomNumber is the value for the solution in the position Box x Cel
function createInputElement(box, cel, randomNumber) {
  var input = document.createElement("input");
  input.setAttribute("type", "number");
  //attribute the randomNumber for the solution into the input element for checking purposes
  input.setAttribute("data-value", randomNumber);
  //Get a random filter based on filterId, box and cel positions and check if should show the value on the board (compares ===1)
  input.value = FILTER_BOARDS[filterId][box - 1][cel - 1] === 1 ? randomNumber : "";
  //add a listener to the inputs events, when the user types a new value in this input, then check the input number by the user against the solution randomNumber
  input.addEventListener("input", function (event) {
    checkNumber(event.data, event.target);
  }, false);
  return input;
}

// creates a logic cel for the logic box in the grid list 
function initCel(cel, box, randomNumber, gridElement) {
  // Creates the new cel object with cel id number, random solution value and the html input element
  var celValue = {
    id: cel,
    value: randomNumber,
    element: createCelElement(box, cel, randomNumber),
  };

  //Pushes the new HTML cel element to the grid HTML element
  gridElement.append(celValue.element)
  // return the new cel object to the caller
  return celValue;
}

// creates a logic Box in the grid list
function initBox(box) {
  // List of cels for each box
  var cels = [];
  var boxElement = createBoxElement(box);
  
  // Loop for each cel, while cel is < boxCols * boxRows =  (3x3/9) add + 1  
  for (var cel = 1; cel < ((boxCols * boxRows) + 1); cel++) {
    //calculates the row position of the cel inside the box, divide the number of the cel by the number of the columns. We subtract 1 from the box number to convert to the array counting
    //after dividing we remove the decimals, so we have the row number
    var boxRow = Math.floor((box - 1) / gridBoxesCols);
    //the column number will be the module of the box number -1 (conversion to array logic) by the number of columns
    var boxCol = (box - 1) % gridBoxesCols;
    //calculates the row in the grid based on the box position in the grid,example box 1,2,3 - first row = 0 / box 4,5,6 - first row = 2 and etc
    var row = Math.floor((cel - 1) / boxCols) + (boxRow * boxRows);
     //calculates the col in the grid based on the box position in the grid,example box 1,4,7 - first col = 0 / box 2,5,8 - first col = 2 and etc
    var col = (cel - 1) % boxCols + (boxCol * boxCols); 
    //with the row and col from the grid we can extract the random number from the solution grid
    var value = solution[row][col];
    //create a new logic cel
    var newCel = initCel(cel, box, value, boxElement);
    //push the new cel logic to the list of cels in the box
    cels.push(newCel);
  }
//add new HTML box element to the screen 
  gridElement.append(boxElement);

  return {
    id: box,
    cels: cels,
  };
}

// first function to create the logic board and the inside boxes
function initBoard() {
  // Loop for each box...
  for (var box = 1; box < ((gridBoxesCols * gridBoxesRows) + 1); box++) {
    // box 1
    var newBox = initBox(box);
    // Add box to the grid list
    grid.push(newBox);
  }
}

//find all the numbers for this row number to check if the new number is not duplicated in this Sudoku line
function getCurrentRowNumbers(rowNumber) {
  return solution[rowNumber] || [];
}

//find all the numbers for this column number to check if the new number is not duplicated in this Sudoku column
function getCurrentColumnNumbers(columnNumber) {
  var column = [];
  //loop through all the previous lines and get only the numbers for the same column
  for (var row = 0; row < solution.length; row++) {
    var currentColumn = solution[row][columnNumber];
    
    if (currentColumn) {
      column.push(currentColumn);
    }
  }
  return column;
}

//receives a list of random numbers from the list of the row or column and returning only the numbers inside the box
function filterBoxList(list, start) {
  return [...list].filter((number, index) => index >= start && index < start + boxRows);
}

//find all the numbers already in the same box, a funcao no caso junta os numeros ja preeenchidos de colunas e linhas dentro do box 
function getCurrentBoxNumbers(rowNumber, columnNumber) {
  var rowOffset = Math.floor(rowNumber / boxRows);
  var colOffset = Math.floor(columnNumber / boxCols); // offset from box to box in the grid
  var boxNumber = (rowOffset * gridBoxesCols) + colOffset;
  var columnOne = (boxNumber % gridBoxesCols) * boxCols;
  var rowOne = Math.floor(boxNumber / gridBoxesCols) * boxCols;
  var boxColumnNumbers = [];
  var boxRowNumbers = [];
  //check the columns for the existing numbers
  for (var i = 0; i < boxCols; i++) {
    var currentCol = getCurrentColumnNumbers(columnOne + i);
    boxColumnNumbers.push(...filterBoxList(currentCol, rowOne));
  }
  //check the rows for the existing numbers
  for (var i = 0; i < boxRows; i++) {
    var currentRow = getCurrentRowNumbers(rowOne + i);
    boxRowNumbers.push(...filterBoxList(currentRow, columnOne));
  }
  
  return [...boxColumnNumbers, ...boxRowNumbers];
}

//loop through rowns and columns and try to fit the random numbers to the grid without repeting the random numbers in the line, column and box
function populateGrid() {
  solution = [];
  // loop for rows/lines
  for (var row = 0; row < (gridBoxesRows * boxRows); row++) {
    solution.push([]);
    var rowList = solution[row];
    // list of randomm numbers for the row
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
        //join all the numbers from the columns, rowns and the boy in one list of numbers already taken
        var currentNumbers = [...currentRowNumbers, ...currentColumnNumbers, ...currentBoxNumbers];
        //by creating a new set with the current numbers we remove the duplicated numbers
        var takenNumbers = new Set(currentNumbers);
        //available numbers by filtering the taken numbers from the available random numbers list
        var availableNumbers = randomList.filter(number => !takenNumbers.has(number));
        //take the first number from the available numbers list to use as a random number for the cel
        //depending on the combinaiton columns, rows and boxes some cels will not have a random number available bc all the possible combinations are taken
        var randomNumber = availableNumbers.pop();
        //remove from the available random Numbers list after using the first number in this cell
        randomList = randomList.filter(number => number !== randomNumber);
        rowList.push(randomNumber);
      }
    }
  }
}

//loop through the rows to check if there is any undefinied random value in any cel of the grid, if underfined value is found the grid is not a valid Sudoku solution
function validateGrid() {
  for(var i = 0; i < (gridBoxesRows * boxRows); i++) {
    var row = solution[i];
    //create a list of the row values
    var rowSet = new Set(row);
    //check if the row contains undefinied value
    if (rowSet.has(undefined)) {
      return false;
    }
  }
  return true;
}

//method called when the user clicks in the options of grid game
function initGame(cols, rows) {
  //the grid dimentions is calculated based on these 2 variables
   gridBoxesCols = cols;
   gridBoxesRows = rows;
   //the game start with the solution "isValid" as false 
   var isValid = false;
   //show in the screen that the game is calculating the board and hide the buttons for the grid options 
   calculatingElement.removeAttribute("hidden");
   boardSizeElement.setAttribute("hidden", true);
  //to give the screen time enough to changethe elements above before start calculating the solution, bc when the solution starts calculating the browser gets freeze
   setTimeout(function () {
    //arbitrary number of temptives, a bigger number can take more time, but has higher chances of sucess
    for(var i = 0; i < 1000; i++) {
      calculatingTryElement.innerHTML = i;

      populateGrid();
      isValid = validateGrid();
      
      if(isValid) {
        initBoard();
        break;
      }
    }
    if (!isValid) {
        errorElement.removeAttribute("hidden");
    }
    //100 mileseconds to starts calculating so the screen has time to update the loading message
    calculatingElement.setAttribute("hidden", true);
    }, 100);
}

function restart() {
  window.location.reload();
}