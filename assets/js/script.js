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
    let dieWrapper = document.getElementById("play-area");

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
 * Starts a new turn. Increments turn counter and triggers dice roll.
 */
function newTurn() {
    // Update the round tracker
    roundNumber += 1;
    document.getElementById("round-tracker").innerHTML = `Round ${roundNumber} of 13.`;

    // Check if Game Over and remove New Turn button.
    if (roundNumber === 13) {
        document.getElementById('new-turn').remove();
    }

    // Reset temporarily blocked spaces.
    let unblock = document.querySelectorAll(".blocked-play-space");
    for (block of unblock) {
        if (block.className !== "used-play-space") {
            block.classList.remove("blocked-play-space");
            block.classList.add("play-space");
        }
    }

    // Reset blocked dice and playerValue.
    let roller = document.getElementsByClassName('roller');
    for (roll of roller) {
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
    // if (!this.classList.contains("usedDie")) {
    if (!document.getElementById('die1').classList.contains("usedDie")) {
        playerValue = parseInt(document.getElementById('die1').innerText);
        // playerValue = parseInt(this.innerText);
        console.log("Die value chosen is " + playerValue);
        document.getElementById('die1').classList.add("clickedDie");
        if (document.getElementById('die2').classList.contains("clickedDie")) {
            document.getElementById('die2').classList.remove("clickedDie");
        }
        // this.classList.add("clickedDie");
        // divIDused.classList.remove("play-space");
        // divIDused.classList.add("blocked-play-space");
        // if (this.classList.contains("play-space") && !this.classList.contains("used-play-space"))
    }
}

/**
 * Allows user to click on second die.
 */
 function selectDice2() {
    if (!document.getElementById('die2').classList.contains("usedDie")) {
        playerValue = parseInt(document.getElementById('die2').innerText);
        console.log("Die value chosen is " + playerValue);
        document.getElementById('die2').classList.add("clickedDie");
        if (document.getElementById('die1').classList.contains("clickedDie")) {
            document.getElementById('die1').classList.remove("clickedDie");
        }
    }

    // playerValue = parseInt(document.getElementById('die2').innerText);
    // console.log("Die value chosen is " + playerValue);
    // document.getElementById('die2').classList.add("clickedDie");
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
    console.log("User clicked div with ID " + this.id);

    // If loop checks if the div has not been blocked or already been used.
    if (this.classList.contains("play-space") && !this.classList.contains("used-play-space")) {

        // places the playerValue text in the div.
        this.innerText = playerValue;
        diceObject[this.id] = playerValue;
        console.log(diceObject);

        // changes class associated with div so the div cannot be reused.
        this.classList.remove("play-space");
        this.classList.add("used-play-space");

        // assigns div id to a var that will block off other divs this turn.
        let clickedDiv = this.id;
        blockDivs(clickedDiv);
    }
    
    // calculateArray();
}

// Event listener for assigning values in play spaces.
let clickPlaySpace = document.getElementsByClassName("play-space");
for (let i = 0; i < clickPlaySpace.length; i++) {
    clickPlaySpace[i].addEventListener("click", assignDice);
}

/**
 * Blocks placement of divs in same column or row as first dice.
 */
function blockDivs(divValue) {

    // Determines which row was clicked.
    let rowNum = divValue.charAt(5);
    console.log("Row clicked is number " + rowNum);

    // Determines which column was clicked.
    let columnNum = divValue.charAt(6);
    console.log("Column clicked is number " + columnNum);

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

    // calculateArray();
    disableDie();
}

/**
 * Blocks the selected die from being reused a second time this round.
 */
function disableDie() {
    // Blocks the die from being used again.
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

    // Build arrays with values in the grid.
    for (let i = 0; i < 5; i++) {
        array1.push(diceObject['value0' + i]);
        array2.push(diceObject['value1' + i]);
        array3.push(diceObject['value2' + i]);
        array4.push(diceObject['value3' + i]);
        array5.push(diceObject['value4' + i]);
    }

    for (let i = 0; i < 5; i++) {
        array6.push(diceObject['value' + i + '0']);
        array7.push(diceObject['value' + i + '1']);
        array8.push(diceObject['value' + i + '2']);
        array9.push(diceObject['value' + i + '3']);
        array10.push(diceObject['value' + i + '4']);
    }

    // Remove undefined entries.
    removeNull(array1);
    removeNull(array2);
    removeNull(array3);
    removeNull(array4);
    removeNull(array5);
    removeNull(array6);
    removeNull(array7);
    removeNull(array8);
    removeNull(array9);
    removeNull(array10);

    // Check for different scoring features.
    detectPoker(array1);
    detectPoker(array2);
    detectPoker(array3);
    detectPoker(array4);
    detectPoker(array5);
    detectPoker(array6);
    detectPoker(array7);
    detectPoker(array8);
    detectPoker(array9);
    detectPoker(array10);

    // now it adds a final number to each array, which is the score of that array.

    console.log(array1);
    console.log(array2);
    console.log(array3);
    console.log(array4);
    console.log(array5);
    console.log(array6);
    console.log(array7);
    console.log(array8);
    console.log(array9);
    console.log(array10);

    presentArrayScore(array1, array2, array3, array4, array5, array6, array7, array8, array9, array10);
}

/**
 * Remove null entries from a given array. Adapted from https://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript
 */
function removeNull(array) {
    let len = array.length;
    for (let j = 0; j < len; j++ ) {
        array[j] && array.push(array[j]);
    }
    array.splice(0 , len);

    // Sort array contents in ascending order. Adapted from https://www.w3schools.com/jsref/jsref_sort.asp
    array.sort(function(a, b){return a-b});
    return;
}

/**
 * Create a var for each array and start it at 0. Go up through the possible combinations, updating the var with better scores if possible. Then return the final score as a final entry on each array.
 */
function detectPoker(array1) {
    let array1Value = 0;

    // Check if values are paired.
    let abPair = array1[0] === array1[1] && array1[0] !== undefined;
    let bcPair = array1[1] === array1[2] && array1[1] !== undefined;
    let cdPair = array1[2] === array1[3] && array1[2] !== undefined;
    let dePair = array1[3] === array1[4] && array1[3] !== undefined;

    // Check if values are sequential.
    let abSeq = array1[0] +1 === array1[1];
    let bcSeq = array1[1] +1 === array1[2];
    let cdSeq = array1[2] +1 === array1[3];
    let deSeq = array1[3] +1 === array1[4];

    // Check single pair.
    if (abPair || bcPair || cdPair || dePair) {
        console.log("Pair!");
        array1Value = 1;
    }

    // Check 2 pair.
    if ((abPair && cdPair) || (abPair && dePair) || (bcPair && dePair)) {
        console.log("Two Pair!");
        array1Value = 2;
    }

    // Check 3 of a kind.
    if ((abPair && bcPair) || (bcPair && cdPair) || (cdPair && dePair)) {
        console.log("Three of a Kind!");
        array1Value = 3;
    }

    // Check full house.
    if ((abPair && bcPair && dePair) || (cdPair && dePair && abPair)) {
        console.log("Full House!");
        array1Value = 4;
        // continue;
    }

    // Check 4 of a kind.
    if ((abPair && bcPair && cdPair) || (bcPair && cdPair && dePair)) {
        console.log("Four of a Kind!");
        array1Value = 4;
    }

    // Check 5 of a kind.
    if (abPair && bcPair && cdPair && dePair) {
        console.log("Five of a Kind!");
        array1Value = 6;
        // continue;
    }

    // Check 3 straight.
    if ((abSeq && bcSeq) || (bcSeq && cdSeq) || (cdSeq && deSeq)) {
        console.log("Three Straight!");
        array1Value = 3;
    }

    // Check 3 straight with pair.
    if ((abSeq && bcSeq && dePair) || (cdSeq && deSeq && abPair)) {
        console.log("Three Straight with Pair!");
        array1Value = 4;
        // continue;
    }

    // Check 4 sraight.
    if ((abSeq && bcSeq && cdSeq) || (bcSeq && cdSeq && deSeq)) {
        console.log("Four Straight!");
        array1Value = 5;
    }

    // Check 5 straight.
    if (abSeq && bcSeq && cdSeq && deSeq) {
        console.log("Five Straight!");
        array1Value = 7;
    }

    array1.push(array1Value);
}

/**
 * Presents the score on a row or column.
 */
function presentArrayScore(array1, array2, array3, array4, array5, array6, array7, array8, array9, array10) {

    let a1length = array1.length
    let score1 = document.getElementById("sum0");
    score1.textContent = array1[a1length - 1];

    let a2length = array2.length
    let score2 = document.getElementById("sum1");
    score2.textContent = array2[a2length - 1];

    let a3length = array3.length
    let score3 = document.getElementById("sum2");
    score3.textContent = array3[a3length - 1];

    let a4length = array4.length
    let score4 = document.getElementById("sum3");
    score4.textContent = array4[a4length - 1];

    let a5length = array5.length
    let score5 = document.getElementById("sum4");
    score5.textContent = array5[a5length - 1];

    let a6length = array6.length
    let score6 = document.getElementById("sum5");
    score6.textContent = array6[a6length - 1];

    let a7length = array7.length
    let score7 = document.getElementById("sum6");
    score7.textContent = array7[a7length - 1];

    let a8length = array8.length
    let score8 = document.getElementById("sum7");
    score8.textContent = array8[a8length - 1];

    let a9length = array9.length
    let score9 = document.getElementById("sum8");
    score9.textContent = array9[a9length - 1];

    let a10length = array10.length
    let score10 = document.getElementById("sum9");
    score10.textContent = array10[a10length - 1];

    calculateFinalScore();
}

/**
 * Calculates total game score.
 */
function calculateFinalScore() {

    let sumDieSpaces = [];
    for (let i = 0; i < 10; i++) {
        temp = parseInt(document.getElementById('sum' + i).innerText);
        sumDieSpaces.push(temp);
    }

    // Adapted from https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers
    let totalScore = sumDieSpaces.reduce(function(a, b) { return a + b; }, 0);

    console.log("Total score is " + totalScore);

    // Update score text on page.
    // let scoreTextUpdate = document.getElementById("total-score");
    document.getElementById('total-score').textContent = `Your total score is ${totalScore}.`;

}