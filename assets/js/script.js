createPlayArea();
randomiseDice()

/**
 * Create the play area.
 */
function createPlayArea() {
    let dieWrapper = document.getElementById("play-area");
    // Create 5 sets of dice containers.
    for (let h = 0; h < 5; h++) {
        // In each set, create 5 regular dice containers.
        for (let i = 0; i < 5; i++) {
            let element = document.createElement("div");
            element.setAttribute("class", "die");
            element.setAttribute("id", "value"+h+i);
            dieWrapper.appendChild(element);
        }
        // At end of each set, create one row summative die container.
        let sumElement = document.createElement("div");
        sumElement.classList.add("sumDie");
        sumElement.setAttribute("id", "sum"+h);
        dieWrapper.appendChild(sumElement);
    }
    // Create one final set of 5 column summative dice containers.
    for (let j = 5; j < 10; j++) {
        let sumElement = document.createElement("div");
        sumElement.classList.add("sumDie");
        sumElement.setAttribute("id", "sum"+j);
        dieWrapper.appendChild(sumElement);
    }
}

/**
 * Begins the game on page load.
 */
function runGame() {

}

/**
 * Starts a new turn. Increments turn counter and triggers dice roll.
 */
function newTurn() {

}

/**
 * Randomises the two dice values, between 1 and 6 and prints them in the die roller spaces.
 * Modified from Love Maths.
 */
function randomiseDice() {
    let num1 = Math.floor(Math.random() * 6) + 1;
    let num2 = Math.floor(Math.random() * 6) + 1;
    let die1 = document.getElementById("die1");
    die1.textContent = num1;
    let die2 = document.getElementById("die2");
    die2.textContent = num2;
}

/**
 * Allows user to click on a dice and assign that value to a game space.
 */
function assignDice() {

}

/**
 * Blocks placement of divs in same column or row as first dice.
 */
function blockDivs() {

}

/**
 * Creates an array of values in a row.
 */
function arrayRow() {

}

/**
 * Creates an array of values in a column.
 */
function arrayColumn() {

}

/**
 * Calculates the score of a row or column array.
 */
function calculateArray() {

}

/**
 * Presents the score on a row or column.
 */
function presentArrayScore() {

}

/**
 * Calculates total game score.
 */
function calculateScore() {

}