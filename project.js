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

function getRandomNumber(randomNumbers, cel, box) {
  if (box > 1) {
    var currentBox = grid.find(gridBox => gridBox.id === box);
    if (currentBox) {
      if (cel < 4) {
        var min = 0;
        var max = 4;
        var cels = currentBox.cels.filter(boxCel => boxCel.id > min && boxCel.id < max).map(boxCel => boxCel.value);
      }
    }
    return randomNumbers[0];
  }
  return randomNumbers[0];
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

function initCel(cel, box, randomNumber) {
  // Creates the new cel object with cel id number, random value and the html input element
  var celValue = {
      id: cel,
      value: randomNumber,
      element: document.querySelector("#box-" + box + " .cel-" + cel + ' input')
  };
  // add data-value attribute to the html element to save the random value in the element
  celValue.element.setAttribute("data-value", randomNumber);

  // Watch for input changes on each cel and call checkNumber, passing the input value and the html target element
  celValue.element.addEventListener('input', function(event) {
    checkNumber(event.data, event.target);
  }, false);

  // return the new cel object to the caller
  return celValue;
}

function initBox(box) {
  // List of cels for each box
  var cels = [];
  // List of random number to be used on each box
  var randomNumbers = getRandomArray();

  // Loop for each cel...
  for (var cel = 1; cel < 10; cel++) { 
    // Get random number from the list to the cel
    var randomNumber = getRandomNumber(randomNumbers, cel, box);
    // Remove the number from the random list
    randomNumbers = randomNumbers.filter(random => random !== randomNumber);
    // Add the cel to the box's cels list
    var newCel = initCel(cel, box, randomNumber);
    cels.push(newCel);
  }

  return {
      id: box,
      cels: cels
  };
}

function initGrid() {
  // Loop for each box...
  for (var box = 1; box < 10; box++) {
    var newBox = initBox(box);
    // Add box to the grid list
    grid.push(newBox);
  }
}

// Show errors on page
var totalErrors = 0;

// List of boxes
var grid = [];

// Start the board
initGrid();

console.log(grid)
console.log(getRandomArray());