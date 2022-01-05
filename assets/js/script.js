createPlayArea();

// roundNumber controls the length of the game.
let roundNumber = 0;

// playerValue contains the die value the player wishes to use.
let playerValue = "";

// diceObject contains all the die values the player has placed.
let diceObject = {};

// contains data that blocks certain divs from being usable in a turn.
// let clickedDiv = "";
// let columnNum = 0;
// let rowNum = 0;
// let divIDused = "value00";

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
    document.getElementById("round-tracker").innerHTML = `Round ${roundNumber} of 13.`

    // Reset temporarily blocked spaces
    let unblock = document.getElementsByClassName("die blocked-play-space");
    for (i = 0; i < unblock.length; i + 1) {
        if (unblock[i].className !== "used-play-space") {
            unblock[i].classList.remove("blocked-play-space");
            unblock[i].classList.add("play-space");
        }
    }

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
    playerValue = parseInt(document.getElementById('die1').innerText);
    console.log("Die value chosen is " + playerValue);
}

/**
 * Allows user to click on second die.
 */
 function selectDice2() {
    playerValue = parseInt(document.getElementById('die2').innerText);
    console.log("Die value chosen is " + playerValue);
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
    for (i = 0; i < 5; i++) {
        let divIDused = document.getElementById("value" + i + columnNum);
        divIDused.classList.remove("play-space");
        divIDused.classList.add("blocked-play-space");
    }

    // Change class of all spaces in row, so they are blocked from clicking this turn.
    for (i = 0; i < 5; i++) {
        let divIDused = document.getElementById("value" + rowNum + i);
        divIDused.classList.remove("play-space");
        divIDused.classList.add("blocked-play-space");
    }
}

/**
 * Calculates the score of a row or column array.
 */
function calculateArray() {
    // Create an array with row 1 values.
    // let array1 = [diceObject['value00'], diceObject['value01'], diceObject['value02'], diceObject['value03'], diceObject['value04']];
    let array1 = ['a', 'b', 'c', 'd', 'e'];
    let array2 = ['a', 'b', 'c', 'd', 'e'];
    let array3 = ['a', 'b', 'c', 'd', 'e'];
    let array4 = ['a', 'b', 'c', 'd', 'e'];
    let array5 = ['a', 'b', 'c', 'd', 'e'];
    let array6 = ['a', 'b', 'c', 'd', 'e'];
    let array7 = ['a', 'b', 'c', 'd', 'e'];
    let array8 = ['a', 'b', 'c', 'd', 'e'];
    let array9 = ['a', 'b', 'c', 'd', 'e'];
    let array10 = ['a', 'b', 'c', 'd', 'e'];

    // Add loops for rest of the arrays.
    for (i = 0; i < 5; i++) {
            array1.push(diceObject['value0'+i]);
    }
    
    // Sorting code adapted from https://www.w3schools.com/jsref/jsref_sort.asp
    array1.sort(function(a, b){return a-b});
    console.log("Array 1 values are " + array1);

    // Check single pair.
    let array1pair = array1[0] === array1[1] || array1[1] === array1[2] || array1[2] === array1[3] || array1[3] === array1[4];
    if (array1pair) {
        console.log("Pair!");
    }
}

/**
 * Presents the score on a row or column.
 */
function presentArrayScore() {
 
}

/**
 * Calculates total game score.
 */
function calculateFinalScore() {

}