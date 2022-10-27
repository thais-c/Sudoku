// Methods Declaration
function getRandomArray() {
    var numbers = []; // new empty array

    var min, max, length, randomNumber, isDuplicated;
        
    min = 1;
    max = 9;
    length = 9; // how many numbers you want to extract
    
    for (let number = 0; number < length; number++) {
      do {
        // get a random number inside the min and max
        randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        // check if the random number is already in the list
        isDuplicated = numbers.includes(randomNumber);
        // if not in the list, then add it
        if(!isDuplicated){
          numbers.push(randomNumber);
        }
      }
      // keep doing the loop until the random number is not duplicated
      while(isDuplicated);
    }

    // return the list
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
  totalErrors++;
  document.getElementById("errors").innerHTML = totalErrors;
}

// method that receives: celNumber, inputNumber and htmlElement. 
// This method will check if the two numbers are equal, 
// if so, set the value to the html element, 
// if not, call addError
function checkNumber(inputNumber, htmlElement) {
  // get the data-value attribute from the html element
  var celNumber = htmlElement.getAttribute("data-value");

  if (!!inputNumber) {
    if (celNumber == inputNumber) {
      htmlElement.innerHTML = celNumber;
      htmlElement.disabled = true;
      htmlElement.classList.remove("bg-danger");
      htmlElement.classList.add("bg-success");
    } else {
      htmlElement.classList.remove("bg-success");
      htmlElement.classList.add("bg-danger");
      addError();
    }
  } else {
    htmlElement.classList.remove("bg-danger");
    htmlElement.classList.remove("bg-success");
  }
}


// Show errors on page
var totalErrors = 0;



// Generate cels
var grid = [];

for (var box = 1; box < 10; box++) {
    // Cels for each box
    var cels = [];
    var randomNumbers = getRandomArray();

    for (var cel = 1; cel < 10; cel++) { 
      var randomNumber = getRandomNumber(randomNumbers, cel, box);
      randomNumbers = randomNumbers.filter(random => random !== randomNumber);
      
      var celValue = {
          id: cel,
          value: randomNumber,
          element: document.querySelector("#box-" + box + " .cel-" + cel + ' input')
      };

  // add html data-value property to the html element
   celValue.element.setAttribute("data-value", randomNumber);


   // Watch for input changes on each cel and call checkNumber
   celValue.element.addEventListener('input', function(event) {
     checkNumber(event.data, event.target);
   }, false);
   cels.push(celValue);
 }      
 
    // each box
    grid.push({
        id: box,
        cels: cels
    });
}

console.log(grid)

console.log(getRandomArray());