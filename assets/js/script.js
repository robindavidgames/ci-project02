/*jshint esversion: 6 */

createPlayArea();

// roundNumber controls the length of the game.
let roundNumber = 0;

// playerValue contains the die value the player wishes to use.
let playerValue = "";

// diceObject contains all the die values the player has placed.
let diceObject = {};

/**
 * Create the play area.
 */
function createPlayArea() {
    let dieWrapper = document.getElementById("dice-area");

    // Create 5 sets of dice containers.
    for (let h = 0; h < 5; h++) {
        // In each set, create 5 regular dice containers.
        for (let i = 0; i < 5; i++) {
            let element = document.createElement("div");
            element.setAttribute("class", "die play-space");
            element.setAttribute("id", "value"+h+i);
            dieWrapper.appendChild(element);
        }
        // At end of each set, create one row summative die container.
        let sumElement = document.createElement("div");
        sumElement.classList.add("sumDie");
        sumElement.setAttribute("id", "sum"+h);
        sumElement.textContent = "0";
        dieWrapper.appendChild(sumElement);
    }
    // Create one final set of 5 column summative dice containers.
    for (let j = 5; j < 10; j++) {
        let sumElement = document.createElement("div");
        sumElement.classList.add("sumDie");
        sumElement.setAttribute("id", "sum"+j);
        sumElement.textContent = "0";
        dieWrapper.appendChild(sumElement);
    }
}

/**
 * Starts a new turn. Increments turn counter and triggers dice roll.
 */
function newTurn() {
    // Update the round tracker
    roundNumber += 1;
    document.getElementById("round-tracker").innerHTML = `Round ${roundNumber} of 13.`;

    // Check if Game Over and remove New Turn button.
    if (roundNumber === 13) {
        document.getElementById('new-turn').remove();

        let newGameButton = document.createElement("input");
        let buttonWrapper = document.getElementById("dice-roller");
        newGameButton.classList.add("button");
        newGameButton.setAttribute("id", "new-game");
        newGameButton.setAttribute("type", "button");
        newGameButton.setAttribute("value", "Play Again");
        // Code for refresh button adapted from https://stackoverflow.com/questions/29884654/button-that-refreshes-the-page-on-click
        newGameButton.setAttribute("onClick", "window.location.reload();");
        buttonWrapper.appendChild(newGameButton);
    }

    // Reset temporarily blocked spaces.
    let unblock = document.querySelectorAll(".blocked-play-space");
    for (let block of unblock) {
        if (block.className !== "used-play-space") {
            block.classList.remove("blocked-play-space");
            block.classList.add("play-space");
        }
    }

    // Reset blocked dice and playerValue.
    let roller = document.getElementsByClassName('roller');
    for (let roll of roller) {
        roll.classList.remove('usedDie');
        roll.classList.remove('clickedDie');
    }
    playerValue = "";

    // Randomise dice
    randomiseDice();
}

// Event listener for the New Turn button.
let newTurnButton = document.getElementById("new-turn");
newTurnButton.addEventListener("click", newTurn);

/**
 * Randomises the two dice values, between 1 and 6 and prints them in the die roller spaces.
 * Modified from Love Maths.
 */
function randomiseDice() {
    let num1 = Math.floor(Math.random() * 6) + 1;
    let num2 = Math.floor(Math.random() * 6) + 1;
    document.getElementById('die1').textContent = num1;
    document.getElementById('die2').textContent = num2;
}

/**
 * Allows user to click on first die.
 */
function selectDice1() {
    let die1 = document.getElementById('die1');
    let die2 = document.getElementById('die2');

    if (!die1.classList.contains("usedDie") && die1.textContent !== "") {
        playerValue = parseInt(die1.innerText);
        die1.classList.add("clickedDie");
        if (die2.classList.contains("clickedDie")) {
            die2.classList.remove("clickedDie");
        }
    }
}

/**
 * Allows user to click on second die.
 */
 function selectDice2() {
    let die1 = document.getElementById('die1');
    let die2 = document.getElementById('die2');

    if (!die2.classList.contains("usedDie") && die1.textContent !== "") {
        playerValue = parseInt(die2.innerText);
        die2.classList.add("clickedDie");
        if (die1.classList.contains("clickedDie")) {
            die1.classList.remove("clickedDie");
        }
    }
}

// Event listener for clicking the first die.
let clickDie1 = document.getElementById("die1");
clickDie1.addEventListener("click", selectDice1);

// Event listener for clicking the second die.
let clickDie2 = document.getElementById("die2");
clickDie2.addEventListener("click", selectDice2);

/**
 * Allows user to place values in the play spaces.
 */
function assignDice() {

    // If loop checks if the div has not been blocked or already been used.
    if (this.classList.contains("play-space") && !this.classList.contains("used-play-space") && playerValue != "") {

        // places the playerValue text in the div.
        this.innerText = playerValue;
        diceObject[this.id] = playerValue;

        // changes class associated with div so the div cannot be reused.
        this.classList.remove("play-space");
        this.classList.add("used-play-space");

        // assigns div id to a var that will block off other divs this turn.
        let clickedDiv = this.id;
        blockDivs(clickedDiv);
    }
}

// Event listener for assigning values in play spaces.
let clickPlaySpace = document.getElementsByClassName("play-space");
for (let i = 0; i < clickPlaySpace.length; i++) {
    clickPlaySpace[i].addEventListener("click", assignDice);
}

/**
 * Blocks placement of divs in same column or row as first dice.
 * @param divValue: the clicked div, from which other div values are calculated.
 */
function blockDivs(divValue) {

    // Determines which row and column were clicked.
    let rowNum = divValue.charAt(5);
    let columnNum = divValue.charAt(6);

    // Change class of all spaces in column, so they are blocked from clicking this turn.
    for (let i = 0; i < 5; i++) {
        let divIDused = document.getElementById("value" + i + columnNum);
        divIDused.classList.remove("play-space");
        divIDused.classList.add("blocked-play-space");
    }

    // Change class of all spaces in row, so they are blocked from clicking this turn.
    for (let i = 0; i < 5; i++) {
        let divIDused = document.getElementById("value" + rowNum + i);
        divIDused.classList.remove("play-space");
        divIDused.classList.add("blocked-play-space");
    }

    disableDie();
}

/**
 * Blocks the selected die from being reused a second time this round.
 */
function disableDie() {
    let clickedDie = document.getElementsByClassName('clickedDie');
    clickedDie[0].classList.add('usedDie');
    clickedDie[0].classList.remove('clickedDie');

    playerValue = "";
    
    calculateArray();
}

/**
 * Calculates the score of a row or column array.
 */
function calculateArray() {
    // Arrays for each row and column to be calculated.
    let array1 = [];
    let array2 = [];
    let array3 = [];
    let array4 = [];
    let array5 = [];
    let array6 = [];
    let array7 = [];
    let array8 = [];
    let array9 = [];
    let array10 = [];

    let bigArray = [array1, array2, array3, array4, array5, array6, array7, array8, array9, array10];

    // Build arrays for each row in the grid.
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 5; i++) {
            bigArray[j].push(diceObject['value' +j + i]);
        }
    }

    // Build arrays for each column in the grid.
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 5; i++) {
            bigArray[j + 5].push(diceObject['value' + i + j]);
        }
    }

    // Remove undefined entries.
    for (let i = 0; i < 10; i++) {
        removeNull(bigArray[i]);
    }

    // Check for different scoring features.
    for (let i = 0; i < 10; i++) {
        detectPoker(bigArray[i]);
    }

    presentArrayScore(bigArray);
}

/**
 * Remove null entries from a given array. 
 * Adapted from https://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript
 * @param array: the array to remove null results from.
 */
function removeNull(array) {
    let len = array.length;
    for (let j = 0; j < len; j++ ) {
        if (array[j]) {
            array.push(array[j]);
        }
    }
    array.splice(0 , len);

    // Sort array contents in ascending order. Adapted from https://www.w3schools.com/jsref/jsref_sort.asp
    array.sort(function(a, b){return a-b;});
    return;
}

/**
 * Go up through the possible combinations, updating a temporary var with better scores if possible. 
 * Then return the final score as a final entry on each array.
 * @param array: the array in which to find poker combinations.
 */
function detectPoker(array) {
    let arrayValue = 0;

    // Check if values in array are paired.
    let abPair = array[0] === array[1] && array[0] !== undefined;
    let bcPair = array[1] === array[2] && array[1] !== undefined;
    let cdPair = array[2] === array[3] && array[2] !== undefined;
    let dePair = array[3] === array[4] && array[3] !== undefined;

    // Check if values in array are sequential.
    let abSeq = array[0] +1 === array[1];
    let bcSeq = array[1] +1 === array[2];
    let cdSeq = array[2] +1 === array[3];
    let deSeq = array[3] +1 === array[4];

    // Check single pair.
    if (abPair || bcPair || cdPair || dePair) {
        arrayValue = 1;
    }

    // Check 2 pair.
    if ((abPair && cdPair) || (abPair && dePair) || (bcPair && dePair)) {
        arrayValue = 2;
    }

    // Check 3 of a kind.
    if ((abPair && bcPair) || (bcPair && cdPair) || (cdPair && dePair)) {
        arrayValue = 3;
    }

    // Check 3 straight.
    if ((abSeq && bcSeq) || (bcSeq && cdSeq) || (cdSeq && deSeq)) {
        arrayValue = 3;
    }

    // Check full house.
    if ((abPair && bcPair && dePair) || (cdPair && dePair && abPair)) {
        arrayValue = 4;
    }

    // Check 3 straight with pair.
    if ((abSeq && bcSeq && dePair) || (cdSeq && deSeq && abPair)) {
        arrayValue = 4;
    }

    // Check 4 of a kind.
    if ((abPair && bcPair && cdPair) || (bcPair && cdPair && dePair)) {
        arrayValue = 4;
    }

    // Check 5 of a kind.
    if (abPair && bcPair && cdPair && dePair) {
        arrayValue = 6;
    }

    // Check 4 sraight.
    if ((abSeq && bcSeq && cdSeq) || (bcSeq && cdSeq && deSeq)) {
        arrayValue = 5;
    }

    // Check 5 straight.
    if (abSeq && bcSeq && cdSeq && deSeq) {
        arrayValue = 7;
    }

    array.push(arrayValue);
}

/**
 * Presents the score on a row or column.
 * @param bigArray: the array from which to output the score.
 */
// function presentArrayScore(array1, array2, array3, array4, array5, array6, array7, array8, array9, array10) {
function presentArrayScore(bigArray) {

    for (let i = 0; i < 10; i++) {
        let arrayLength = bigArray[i].length;
        let score = document.getElementById("sum" + i);
        score.textContent = bigArray[i][arrayLength - 1];
    }

    calculateFinalScore();
}

/**
 * Calculates total game score.
 */
function calculateFinalScore() {

    let sumDieSpaces = [];
    for (let i = 0; i < 10; i++) {
        let temp = parseInt(document.getElementById('sum' + i).innerText);
        sumDieSpaces.push(temp);
    }

    // Adapted from https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers
    let totalScore = sumDieSpaces.reduce(function(a, b) { return a + b; }, 0);

    // Update score text on page.
    document.getElementById('total-score').textContent = `Your total score is ${totalScore}.`;
}