# README for Full House Dice JavaScript Project

## Introductions
Full House Dice is a JavaScript implementation of an original game that I have designed. It is a casual game for a general audience.

## Features

## Testing

## Bugs and Issues

### Fixed Bugs and Issues
* In the calculateArray JavaScript function, values in an array are compared to see if they meet different poker hand requirements. However, if spaces on the board were left empty, this function was allowing the "null" spaces to act as Pair, Five of a Kind, etc. To fix this, I created placeholder arrays for each row and column, with unique entries in each space, therefore removing "null" entries.
* Users were able to click the same div repeatedly, changing the value within. To prevent this, I put the function details within an if loop checking if this.classList.contains("play-space"). Within that loop, the play-space class is removed from the div, ensuring the loop cannot run a second time. This same technique also allowed me to dynamically block off certain spaces from being used, in accordance with game rules.

### Outstanding Bugs and Issues

## Validator Testing

## Deployment

## Credits

### Content
Ie, where code snippets come from.

### Media
* Favicon is "Perspective dice 6 faces 1 icon" by Delapouite under CC BY 3.0. Taken from https://game-icons.net/1x1/delapouite/perspective-dice-six-faces-one.html (update this with a transparent background and smaller margins)