createPlayArea();

/**
 * Create the play area.
 */
function createPlayArea() {
    for (let i = 0; i < 5; i++) {
        let element = document.createElement("div");
        element.classList.add("die")
        let dieWrapper = document.getElementById("play-area");
        dieWrapper.appendChild(element);
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
 * Randomises the two dice values, between 1 and 6.
 */
function randomiseDice() {

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