# README for Full House Dice JavaScript Project

## Introductions
Full House Dice is a JavaScript implementation of an original game that I have designed. It is a casual game for a general audience.

## Features
* Javascript code to dynamically create the play-area elements. This could have been achieved by creating 35 divs, but I wanted to see if I could use the JavaScript code to create simpler HTML. Conceivably, I could expand or contract the number of divs in the play area with no change to the HTML.
* A dice-rolling section, which keeps track of round number, total score, and available dice. Players can press the "Roll Dice" button to generate 2 new dice values, randomly numbered between 1 and 6. 
* The round number will also update at this point. 
* The score area updates dynamically as players put their dice values into the play area. The "Roll Dice" button disappears at the end of the game, ensuring the player cannot play more than 13 rounds.
* A play-area, in which players will allocate their dice values. This forms the bulk of the JavaScript code. Players take the dice from the dice-rolling section and put them into this grid by clicking on the dice and then clicking on an available square.
* The grid updates dynamically, blocking out specific spaces, accoring to the game rules, after each action. These spaces are then reset every turn. 
* The two rolled dice update when they are used, so that they may not be used more than once each. Their colours change to clearly indicate to the user what their status is - yellow to indicate they are currently being used, red to indicate that have been used in that turn.
* The values from each row and column in the grid are placed into arrays that are scored according to the rules of poker. 
* The scores for each row and column are updated dynamically and placed into a box at the end of each row and column. The total score for all of these rows and columns are updated at the top of the page.
* A scoring cheat-sheet is to the right of the play area, so that users can always see their objectives.
* Full rules to the game are below the play area.

## Testing

## Bugs and Issues

### Fixed Bugs and Issues
* In the calculateArray JavaScript function, values in an array are compared to see if they meet different poker hand requirements. However, if spaces on the board were left empty, this function was allowing the "null" spaces to act as Pair, Five of a Kind, etc. To fix this, I created placeholder arrays for each row and column, with unique entries in each space, therefore removing "null" entries.
* Users were able to click the same div repeatedly, changing the value within. To prevent this, I put the function details within an if loop checking if this.classList.contains("play-space"). Within that loop, the play-space class is removed from the div, ensuring the loop cannot run a second time. This same technique also allowed me to dynamically block off certain spaces from being used, in accordance with game rules.
* A function that reset the board each round would use getElementsByClassName() and then iterate on that nodelist to change classnames. Because getElementsByClassName() creates a live nodelist, changing the classnames was altering the nodelist and causing errors and omissions. I asked Slack for help and was pointed to this document: https://developer.mozilla.org/en-US/docs/Web/API/NodeList . I switched from using getElementsByClassName() to using querySelectorAll(), which creates a static nodelist and can be iterated upon without changing the contents.
* Code to check for poker combinations was extremely long and repetitive. I implemented a series of variables that would check contents of a given array for repeated numbers and numbers in sequence. I was able to turn code that looked like this:

        let array1ThreeStraightPair = (array1[0] === array1[1] + 1 && array1[1] === array1[2] + 1 && array1[0] !== undefined && array1[3] === array1[4] && array1[3] !== undefined) || (array1[2] === array1[3] + 1 && array1[3] === array1[4] + 1 && array1[2] !== undefined && array1[0] === array1[1] && array1[0] !== undefined);

        if (array1ThreeStraightPair) { ...

    into cleaner, easier to read and less resource intensive code. It uses variables to check parts of combinations only one time and looks like this:

        if ((abSeq && bcSeq && dePair) || (cdSeq && deSeq && abPair)) { ...

* Users were able to use the same dice repeatedly, placing more than 2 numbers each turn. To fix this, I created a system of adding class names (clickedDie and usedDie) to dice that had been used and placing "if" statements around the code for using those dice. These statements checked which classes were assigned to the dice and if they could be used again. This also allowed me to create CSS rules for those classes, updating the colours of dice as they were clicked and used, improving the user experience.
* A line in the removeNull function was prompting an error in JSHint.
    
        array[j] && array.push(array[j]);
    
    I updated the line to use more conventional syntax.

        if (array[j]) {

            array.push(array[j]);

        }

### Outstanding Bugs and Issues

## Validator Testing

## Deployment

## Technologies Used
* Javascript, CSS and HTML.
* GitHub
* GitPod

## Credits

### Content
Ie, where code snippets come from.

### Media
* Favicon is "Perspective dice 6 faces 1 icon" by Delapouite under CC BY 3.0. Taken from https://game-icons.net/1x1/delapouite/perspective-dice-six-faces-one.html (update this with a transparent background and smaller margins)