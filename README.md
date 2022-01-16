# README for Full House Dice JavaScript Project

## Introductions
Full House Dice is a JavaScript implementation of an original game that I have designed. It is a casual game for a general audience. Players roll dice and place the dice values in a grid, in order to create poker-style number combinations. 

Click here to play [Full House Dice](https://robindavidgames.github.io/ci-project02/).

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

* The values from each row and column in the grid are placed into arrays that are scored according to the rules of poker. 
* The scores for each row and column are updated dynamically and placed into a box at the end of each row and column. The total score for all of these rows and columns are updated at the top of the page.

![Image of row and column scores being updated.](/assets/images/readme/features13.png)
![Image of row and column scores being updated.](/assets/images/readme/features16.png)

* The "Roll Dice" button disappears at the end of the game, ensuring the player cannot play more than 13 rounds. Once 13 rounds have been played, a new button appears that lets the player restart the game.

![Image of New Game button.](/assets/images/readme/features17.png)

* A scoring cheat-sheet is to the right of the play area, so that users can always see their objectives.
* Full rules to the game are below the play area.
* The site has a custom favicon.
* The game uses "defensive design" principles which ensure that the user cannot easily or accidentally cheat. They cannot place dice in blocked spaces, they cannot place the same dice multiple times, and they cannot activate spaces without having first chosen a dice to use.

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

## Credits

### Content
Ie, where code snippets come from.

### Media
* Favicon is "Perspective dice 6 faces 1 icon" by Delapouite under CC BY 3.0. Taken from [Game-Icons.net](https://game-icons.net/1x1/delapouite/perspective-dice-six-faces-one.html) (update this with a transparent background and smaller margins)