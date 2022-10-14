// Show errors on page
var errorsElement = document.querySelector("#errors");
var totalErrors = 0;
errorsElement.innerHTML = totalErrors;

// Generate cels
var grid = [];

for (var box = 1; box < 10; box++) {
    // Cels for each box
    var cels = [];
    for (var cel = 1; cel < 10; cel++) { 
        var celValue = {
            id: cel,
            value: cel,
            element: document.querySelector("#box-" + box + " .cel-" + cel + ' input')
        };
        celValue.element.value = cel;
        cels.push(celValue);
    }

    // each box
    grid.push({
        id: box,
        cels: cels
    });
}

console.log(grid)