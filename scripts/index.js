import * as classes from "./classes.js"

// Create function to start game
let startGame = function(){
    const game = new classes.Game()
    game.dealCards();
}




/* Test Hand class

const myHand = new Hand(dealer=false);

console.log(myHand.cards);
console.log(myHand.sumCards());
console.log(myHand.status());

myHand.draw();
console.log(myHand.cards);
console.log(myHand.sumCards());
console.log(myHand.status());

*/

// Test Game class

/*
const game = new Game();
console.log("Player Cards",game.player.cards);
console.log("Sum of player cards", game.player.sumCards());
console.log("Status of player hand", game.player.status());

console.log("Dealer Cards",game.dealer.cards);
console.log("Sum of dealer cards", game.dealer.sumCards());
console.log("Status of dealer hand", game.dealer.status());
*/


// Test deck class

/*
const myDeck = new Deck();
myDeck.summarize();
cards = myDeck.getCards();
topCard = cards.pop();
console.log(topCard);
myDeck.summarize();
console.log(myDeck.draw());
myDeck.summarize();
myDeck.shuffle();
console.log(myDeck.getCards());
*/

// Re-test of Hand Class
/*
let tDeck = new Deck();
let tHand = new Hand(false, tDeck);
tDeck.summarize();
console.log(tDeck.getCards().length);

let uDeck = createDeck();
console.log(uDeck.length);

console.log(tHand.cards);
*/

// Test game

const game = new Game()

// Side tests
// console.log("Player Hand: ", game.player.cards);
// console.log("Dealer Hand: ", game.dealer.cards);
// game.deck.summarize();
//game.dealCards();


