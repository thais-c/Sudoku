## Sudoku Game 
This is a project that creates a popular Japanese puzzle game called Sudoku. It is based on the logical placement of numbers.
How to play: The goal of Sudoku is to fill in a 9×9 grid with digits so that each column, row, and 3×3 section contain the numbers between 1 to 9. At the beginning of the game, the 9×9 grid will have some of the squares filled in. Your job is to use logic to fill in the missing digits and complete the grid. We also offer the grids 2x2 and one single grid to play. 

## Tools for development 
Vanilla JavaScript, HTML and CSS
Visual Studio Code - Visual Studio Code is used to develop the code

## How to Install and Run the Project
Use git clone or fork or download as a zip file and exctract in your machine. Navigate to the extracted folder and double click in the index.HTML file. It will open the game in the browser.

## Technical Implementation

The code builds the game by looping through the variables that set the columns and rows for the grid, based on the user selection in the UI buttons (3x3, 2x2, 1x1). 

The method that creates the Sudoku solution for the random numbers in the grid, will follow the dimentions from the user selection, and runs in loop N times until the solution is valid or until the maximum looping count is exceeded. Some solutions will not be valid depending on the first line of random numbers. After the fourth row some solutions will not have available numbers to fill the cels, because some combinations of lines, rows and boxes will not have unique values that satisfied the Sudoku conditions, setting undefinied value to the cel. After each solution is calculated in the trial loop a function checks if the solutions contains undefinied values, if the solution contains only numbers and not undefinied values than the solutions is valid and the create grid method is called.

The grid is built by creating the boxes and then the list of cels for each box. WHen the cel is created in javaScript, the div and the input for the HTML are created and fed with the random number possible for that grid position, coming from the solution list from the last step. The input element receives at the moment of creation a callback function that checks if the user typed number is the same as the random number associated to that cel. In case of being the same number the input will be disable and a sucess green background is added to the cel. In negative case the cel will be painted with red and the error counter on the grid's header will be incremented. Also in the creation moment the cel will receive from the filters board list, a random mask solution to hide and show the random values in the cell, so we can have the intial Sudoku state with some values on the board. 



