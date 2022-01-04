createPlayArea();

// roundNumber controls the length of the game.
let roundNumber = 0;

// playerValue contains the die value the player wishes to use.
let playerValue = "";

// let rowValue = [];

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
 * Begins the game on page load.
 */
// function runGame() {

// }

/**
 * Starts a new turn. Increments turn counter and triggers dice roll.
 */
function newTurn() {
    roundNumber += 1;
    document.getElementById("round-tracker").innerHTML = `Round ${roundNumber} of 13.`
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
    // if (this.class === "die play-space") {
        this.innerText = playerValue;
        diceObject[this.id] = playerValue;
        console.log(diceObject);
    // }
    arrayRow();
}

// Event listener for assigning values in play spaces.
let clickPlaySpace = document.getElementsByClassName("play-space");
for (let i = 0; i < clickPlaySpace.length; i++) {
    clickPlaySpace[i].addEventListener("click", assignDice);
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
    // Need to iterate these for all rows
    // for (let i = 0; i < 5; i++) {
        
    // }
    // let die00 = parseInt(document.getElementById('value00').innerText);
    // let die01 = parseInt(document.getElementById('value01').innerText);
    // let die02 = parseInt(document.getElementById('value02').innerText);
    // let die03 = parseInt(document.getElementById('value03').innerText);
    // let die04 = parseInt(document.getElementById('value04').innerText);
    // rowValue = [die00, die01, die02, die03, die04];
    // console.log(rowValue);
    calculateArray();
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
    // Create an array with row 1 values.
    // let array1 = [diceObject['value00'], diceObject['value01'], diceObject['value02'], diceObject['value03'], diceObject['value04']];
    let array1 = ['a', 'b', 'c', 'd', 'e'];
    for (i = 0; i < 5; i++) {
            array1.push(diceObject['value0'+i]);
    }
    
    // Sorting code adapted from https://www.w3schools.com/jsref/jsref_sort.asp
    array1.sort(function(a, b){return a-b});
    console.log("Array 1 values are " + array1);

    // Check single pair.
    // Unfortunately this is allowing undefined to trigger it.
    // let array1pair = (array1[0] === array1[1] && array1[0] !== null) || (array1[1] === array1[2] && array1[1] !== null) || (array1[2] === array1[3] && array1[2] !== null) || (array1[3] === array1[4] && array1[3] !== null);
    let array1pair = array1[0] === array1[1] || array1[1] === array1[2] || array1[2] === array1[3] || array1[3] === array1[4];
    if (array1pair) {
        console.log("Pair!");
    }

    // Whatever the final score it, append it as array1[5] and then later print those to the score spaces.
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