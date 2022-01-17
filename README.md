# README for Full House Dice JavaScript Project

## Introductions
Full House Dice is a JavaScript implementation of an original game that I have designed. It is a casual game for a general audience. Players roll dice and place the dice values in a grid, in order to create poker-style number combinations for each row and column. Players receieve a total score depending on how well they place their dice over the 13 game turns. 

The goal of the project is to create a game that can be quickly learnt and played. It uses validated input and feedback to ensure the user cannot "break" the game accidentally and UX principals to ensure the user can quickly grasp possible interaction points.

**Click here to visit the [Full House Dice](https://robindavidgames.github.io/ci-project02/) webpage.**

![Image of responsive design.](/assets/images/readme/am_i_responsive.jpg)
Screenshot from ami.responsivedesign.is

## Features
* The core game consists of two interacting sections - one section that contains rolled dice and one section in which those dice are played. The panel on the right is a non-interactive information panel.

![Image of interactive part of the site.](/assets/images/readme/features01.png)

* Javascript code to dynamically create the play-area elements. This could have been achieved by creating 35 divs, but I wanted to challenge myself to use the JavaScript code to create simpler HTML. Conceivably, I could expand or contract the number of divs in the play area with no change to the HTML.

![Image of divs created through JavaScript.](/assets/images/readme/features02.png)

* A dice-rolling section, which keeps track of round number, total score, and available dice. Players can press the "Roll Dice" button to generate 2 new dice values, randomly numbered between 1 and 6. 

![Image of dice rolling part of the site.](/assets/images/readme/features03.png)

* The round number will also update at this point. 

![Image of updating round number.](/assets/images/readme/features04.png)

* The score area updates dynamically as players put their dice values into the play area.

![Image of updating score area.](/assets/images/readme/features05.png)

* A play-area, in which players will allocate their dice values. This forms the bulk of the JavaScript code. Players take the dice from the dice-rolling section and put them into this grid by clicking on the dice and then clicking on an available square.

![Image of play area with some placed values.](/assets/images/readme/features06.png)

* The grid updates dynamically, blocking out specific spaces, accoring to the game rules, after each action. These spaces are then reset every turn. 

![Image of play area after resetting for a new round.](/assets/images/readme/features07.png)

* The two rolled dice update when they are used, so that they may not be used more than once each. Their colours change to clearly indicate to the user what their status is - green to indicate they are currently being used, red to indicate that have been used in that turn. These colours were chosen because they have clear associations of "proceed" and "stop".

![Image of green "clicked" dice.](/assets/images/readme/features08.png)
![Image of red "used" dice.](/assets/images/readme/features09.png)

* The player is able to select a dice and then change their mind and select the other dice. Once they click on the play area, they dice is "used" and turns red. The player may not affect the play area before choosing a dice and turning it green.

![Image of yellow selected dice.](/assets/images/readme/features10.png)
![Image of choosing the other dice.](/assets/images/readme/features11.png)
![Image of a used dice and a selected dice.](/assets/images/readme/features12.png)

* The values from each row and column in the grid are placed into arrays that are scored according to the rules of poker. It doesn't matter in what order the numbers are placed in the play-area as a function rearranges the arrays into ascending order.
* The scores for each row and column are updated dynamically and placed into a box at the end of each row and column. The total score for all of these rows and columns are updated at the top of the page.

![Image of row and column scores being updated.](/assets/images/readme/features13.png)
![Image of row and column scores being updated.](/assets/images/readme/features16.png)

* The "Roll Dice" button disappears at the end of the game, ensuring the player cannot play more than 13 rounds. Once 13 rounds have been played, a new button appears that lets the player restart the game.

![Image of New Game button.](/assets/images/readme/features17.png)

* A scoring cheat-sheet is to the right of the play area, so that users can always see their objectives.
* Full rules to the game are below the play area.
* The site has a custom favicon.
* All external links open in a new tab.
* HTML code is structured with sematic markup.
* The game uses "defensive design" principles of validated input which ensure that the user cannot easily or accidentally cheat. They cannot place dice in blocked spaces, they cannot place the same dice multiple times, and they cannot activate spaces without having first chosen a dice to use. I considered adding alerts when players clicked on invalid spaces or tried to take an otherwise invalid action, but I did not feel this fit with the casual nature of the game. The game is so simple, that I think alerts are unnecessary. This might become a future feature.

## Design

### Visual Design

* I have opted for a clean design, without distractions. The page doesn't use images.
* There is a motif of rounded edges on the various divs and squares. This is to reflect the shape of dice, which have rounded edges.
* The divs placed at the end of each row and column, which calculate scores, do not have rounded edges - this is to distinguish them from interactive spaces.

### User Experience Design

* The game uses established conventions for interaction. Users can click a link at the top of the page to read rules, or simply begin playing.
* Validated input prevents users from breaking the game.
* Text at the top of the page instructs users how to begin: "Roll the dice to begin." Immediately followed by a "Roll Dice" button.
* The text then updates to show progress in the game.
* Text in the play area clearly indicates, "Assign dice here."
* Clicked dice are coded green and red to suggest "available" and "unavailable" respectively.
* Unusable spaces are coloured grey and cannot be interacted with.

## Accessibility

* Rather than use images of dice (ie, showing dice pips), I used text values of 1-6. This means the site remains accessible to the visually impaired.
* There are no images on the site.
* Colours have a stark contrast between background and foreground.

## Testing

* The site functions as expected.
* All internal and external links work.
* The design is responsive to screen size.
* The JavaScript code works as expected, excuting the game rules as planned.
* The site has been tested on multiple browers (Firefox and Chrome) and multiple mobile platforms (Android and iOS).

## Bugs and Issues

### Fixed Bugs and Issues
* In the calculateArray JavaScript function, values in an array are compared to see if they meet different poker hand requirements. However, if spaces on the board were left empty, this function was allowing the "null" spaces to act as Pair, Five of a Kind, etc. To fix this, I created the removeNull() function, which deletes null entries from an array. It does this by creating a temporary array, copying valid entries, and then overwriting the original array.
* Users were able to click the same div repeatedly, changing the value within, while game rules state that this shouldn't be possible. To prevent this, I put the function details within an "if" loop checking if this.classList.contains("play-space"). Within that loop, the play-space class is removed from the div, ensuring the loop cannot run a second time. This same technique gave me the flexibility that allowed me to dynamically block off certain spaces from being used each turn, in accordance with game rules.
* The function that reset the board each round would use getElementsByClassName() and then iterate on that nodelist to change classnames. Because getElementsByClassName() creates a live nodelist, changing the classnames was altering the nodelist and causing errors and omissions. I asked Slack for help and was pointed to [this document](https://developer.mozilla.org/en-US/docs/Web/API/NodeList). I switched from using getElementsByClassName() to using querySelectorAll(), which creates a static nodelist and can be iterated upon without changing the contents.
* Code to check for poker combinations was extremely long and repetitive. I implemented a series of variables that would check contents of a given array for repeated numbers and numbers in sequence. I was able to turn code that looked like this:

        let array1ThreeStraightPair = (array1[0] === array1[1] + 1 && array1[1] === array1[2] + 1 && array1[0] !== undefined && array1[3] === array1[4] && array1[3] !== undefined) || (array1[2] === array1[3] + 1 && array1[3] === array1[4] + 1 && array1[2] !== undefined && array1[0] === array1[1] && array1[0] !== undefined);

        if (array1ThreeStraightPair) { ...

    into cleaner, easier to read and less resource intensive code. It uses variables to check parts of combinations only one time and looks like this:

        if ((abSeq && bcSeq && dePair) || (cdSeq && deSeq && abPair)) { ...

* Users were able to use the same dice repeatedly, placing more than 2 numbers each turn. To fix this, I created a system of adding class names (clickedDie and usedDie) to dice that had been used and placing "if" statements around the code for using those dice. These statements checked which classes were assigned to the dice and if they could be used again. This also allowed me to create CSS rules for those classes, updating the colours of dice as they were clicked and used, improving the user experience.
* PLayers were able to click on the dice rolling divs, changing their colour to green, without actually rolling the dice to begin the game. While they couldn't place the empty values into the play area, people who tested the page for me highlighted that it felt wrong. I added a simple "if" statement to make sure that the divs contained text before reacting to player clicks.

        if (!die1.classList.contains("usedDie") && die1.textContent !== "") { ...

* A line in the removeNull function was prompting an error in JSHint:
    
        array[j] && array.push(array[j]);
    
    I updated the line to use more conventional syntax. This also benefits from being more "human readable":

        if (array[j]) {
            array.push(array[j]);
        }

* The game initially handled scoring by working with 10 seperate arrays (one for each row and column), but these could not be iterated though, leading me to use code that looked like this.

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

    I combined all the arrays into a single array which let me create iteratable code. 
    
        for (let i = 0; i < 10; i++) {
            removeNull(bigArray[i]);
        }

    This leads to cleaner code (about 60 lines shorter) which is also more easily extendable in the future, should I increase the number of rows or columns used in the game.

### Outstanding Bugs and Issues

No outstanding bugs or issues.

## Validator Testing

1. The website has passed the HTML validator without issue. [Link](https://validator.w3.org/nu/?doc=https%3A%2F%2Frobindavidgames.github.io%2Fci-project02%2F)

2. The website has passed the CSS validator without issue. [Link](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Frobindavidgames.github.io%2Fci-project02%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)

3. JSHint.com reports no unresolved issues in the Javascript code.

![Image of JSHint report.](/assets/images/readme/JSHint.jpg)

4. The website scored 100/100 on Lighthouse testing for Desktop.

![Image of JSHint report.](/assets/images/readme/lighthouse_desktop.png)

5. The website scored 99/100 on Lighthouse testing for Mobile.

![Image of JSHint report.](/assets/images/readme/lighthouse_mobile.png)

## Deployment

Full House Dice has been deployed on GitHub Pages. The process for doing so is as follows.

1. Open the project in GitHub.

![Image of project page on GitHub.](/assets/images/readme/github1.png)

2. Click on Settings and Pages.

![Image of Pages tab on GitHub.](/assets/images/readme/github2.png)

3. Select the branch, "main".

![Image of choosing branch.](/assets/images/readme/github3.png)

4. Click "save".

![Image of final settings for deployed page.](/assets/images/readme/github4.png)

5. The site is now deployed and may be accessed at the assigned link.

![Image of deployed page details.](/assets/images/readme/github5.png)

## Technologies Used
* Javascrip
* CSS
* HTML
* GitHub
* GitPod
* GitHub Pages
* Firefox developer tools
* Chrome developer tools
* JSHint
* W3 HTML Validator
* W3 CSS Validator
* Affinity Designer (for editing favicon)
* favicon.io

## Credits

### Content
* spript.js, line 65. Code for the New Game button adapted from [StackOverflow](https://stackoverflow.com/questions/29884654/button-that-refreshes-the-page-on-click).
* script.js, line 264. Code for removeNull function adapted from [StackOverflow](https://stackoverflow.com/questions/281264/remove-empty-elements-from-an-array-in-javascript).
* script.js, line 274. Code for sorting array contents in ascending order adapted from [W3Schools](https://www.w3schools.com/jsref/jsref_sort.asp).
* script.js, line 379. Code for calculating total value of an array adapted from [StackOverflow](https://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers).

### Media
* Favicon is "Perspective dice 6 faces 1 icon" by Delapouite under CC BY 3.0. Taken from [Game-Icons.net](https://game-icons.net/1x1/delapouite/perspective-dice-six-faces-one.html) (update this with a transparent background and smaller margins)
* All game text is my own original content.