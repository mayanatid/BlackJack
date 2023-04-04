# Welcome to BlackJack
***

<p float="left">
<img src="https://media.istockphoto.com/id/165634496/vector/blackjack-icon-with-ace-of-spades-and-king-of-hearts.jpg?s=170667a&w=0&k=20&c=HN9nxDg3QWu-Wjmzb9maaeUHtZdpMh07J2OL-bjFW5w=" width="150"> 

</p>


## Overview
A blackjack game implemented in Javascript

## Description
The rules of black can be found [here](https://bicyclecards.com/how-to-play/blackjack/). The game begins by setting a "bankroll" which is the player's starting available funds.
The game then begins, and a player can bet any amount they want before cards are dealt. Once the cards are dealt the player has the option to hit, fold, stay, or double-down.

## Structure
The program is implemented using object oriented programming, with the following 3 classes doing the majority of the work: 

- **Deck:** keeps track of the current deck. Cards that are dealt are removed from the deck. The deck has a method for getting shuffled and dealing. There are also several methods which summarize the cards remaining in the deck.
- **Hand:** stores pertinant details of a given hand. The constructor allows the hand to be marked as belonging to a player or dealer. This becomes important for details such as whether the dealer has 21 on the first deal (which is an automatic lose for the player)
- **Game:** constructs a dealer and player hand. Also allows customization of how often deck gets shuffled (currently at 50%). We then have metods to handle different actions: draw, stay, double down.
- **Bankroll:** keeps track of amount of money player has. Game ends once hit 0.

## Installation
The application can be launched on a localhost server using the index.html file
