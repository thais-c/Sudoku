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

// Show errors on page
var errorsElement = document.querySelector("#errors");
var totalErrors = 0;
errorsElement.innerHTML = totalErrors;

// Generate cels
var grid = [];

for (var box = 1; box < 10; box++) {
    // Cels for each box
    var cels = [];
    var randomNumbers = getRandomArray();

    for (var cel = 1; cel < 10; cel++) { 
        var celValue = {
            id: cel,
            value: randomNumbers[cel - 1],
            element: document.querySelector("#box-" + box + " .cel-" + cel + ' input')
        };
        celValue.element.value = celValue.value;
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