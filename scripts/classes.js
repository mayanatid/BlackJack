// -------------Helper Functions-------------

// Shuffles an array
// from https://javascript.info/task/shuffle
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
  
      // swap elements array[i] and array[j]
      // we use "destructuring assignment" syntax to achieve that
      // you'll find more details about that syntax in later chapters
      // same can be written as:
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

// Generates a new card
function generateCard(){
    return Math.floor(Math.random() * 10) + 2;
}

// Sums up card values
function sumCards(cards){
    let sum = 0
    for (let i in cards){
        sum+= cards[i];
    }
    return sum;
}

// Checks for ace bust
// Returns index of first ace if bust
function checkAce (cards){
    for(let i in cards){
        if(cards[i] == 11){
            if(sumCards(cards) > 21){
                return i;
            } else{
                return false;
            }
        }
    }
}

function createDeck(){
    let deck = [];

    // Add 4 of each number to deck
    for(let i=2; i <=9; i++){
        for(let j=0; j<4; j++){
            deck.push(i);
        }
    }

    // Add 4 of 10, J, Q, K
    for(let i=0; i<16; i++){
        deck.push(10);
    }

    // Add 4 Aces
    for(let i=0; i<4; i++){
        deck.push(11);
    }

    return deck;
}

//-------------DOM PROPERTIES-------------
let startButton = document.getElementById("start-el");
let messageText = document.getElementById("message-el");
let cardsText = document.getElementById("card-el");
let sumText = document.getElementById("sum-el");
let dealerCardsText = document.getElementById("dealer-card-el");
let dealerSumText = document.getElementById("dealer-sum-el");


// -------------CLASSES-------------

// Deck class
class Deck{
    constructor(){
        this.deck = createDeck();
    }

    // Getter
    getCards = function(){
        return this.deck;
    }

    // Give a deck summary of how many cards left in each value
    summarize = function(){
        console.log("Deck length:", this.deck.length)
        let deckVals = {}
        for(let i =0; i<this.deck.length; i++){
            if (this.deck[i] in deckVals){
                deckVals[this.deck[i]]++;
            }else {
                deckVals[this.deck[i]] = 1;
            }

        } 
        console.log(deckVals);      
    }

    // Shuffle deck using shuffleArray helper function.
    shuffle = function(){
        this.deck = shuffleArray(this.deck);      
    }

    

    // Pull card from 'top'
    draw = function(){
        let card = this.deck.pop();
        return card;
    }


    

}

// Hand Class
// To be used in Game class for each player and dealer
// Added: 'dealer' argument in constructor that determines
// if hand is a dealer or not
// Added: deck input which becomes 
// Potential Add: bankroll? Will have ability to put some amount and 
// win; will keep track of winnings/losses?
class Hand{
    constructor(dealer, deck){
        this.dealer = dealer;
        this.deck = deck;
        this.cards = [];
        // Generate two cards
        this.cards.push(this.deck.draw())
        this.cards.push(this.deck.draw())
        // Check that there is no ace bust
        let idx = checkAce(this.cards);
        if (idx){
            this.cards[idx] = 1;
        }
    }

    // Sum up cards in hand
    sumCards = function(){
        let sum = 0;
        for (let i in this.cards){
            sum+= this.cards[i];
        }
        return sum;
    }

    // Check for ace bust (past constructor)
    checkAceHand = function(){
        for(let i in this.cards){
            if(this.cards[i] == 11){
                if(this.sumCards() > 21){
                    this.cards[i] = 1;
                }
            }
        }
    }

    draw = function(){
        this.cards.push(this.deck.draw());
        // Check for ace bust
        this.checkAceHand();
    }

    status = function(){
        if (this.sumCards() > 21){
            return "Bust";
        } else if (this.sumCards() < 21){
            return "No Bust";
        } else {
            return "BlackJack";
        }
    }
    
}

// Game class constructs a player hand and dealer hand 
class Game{
    constructor(){
        this.deck = new Deck();
        this.deck.shuffle();
        this.dealer = new Hand(true, this.deck);
        this.player = new Hand(false, this.deck);
        this.dealCount = 1;
        this.gameStatus = "going";
        this.playerDone = false;
        this.dealerDone = false;
        this.status = "Want to play a round?";

    }

    deckSummary = function(){
        this.deck.summarize;
        //this.dealer.deck.summarize();
    }

    
    dealCards = function(){
        console.log("Current deal count:", this.dealCount);
        while(this.gameStatus!="over"){
            // messageText.textContent = this.status; // Update UI
            if(this.dealCount == 1 && (this.playerDone == false && this.dealerDone == false)){
                // On the first hand can only see one of the dealer's cards
                // Also, automatically lose if dealer has blackjack
                if(this.dealer.status() == "BlackJack"){
                    messageText.textContent = "Dealer has BlackJack! You lose";
                    dealerCardsText.textContent = this.dealCards.cards;
                    dealerSumText.textContent = this.dealCards.sumCards();
                    console.log("Dealer has BlackJack! You lose");
                    this.gameStatus = "over";
                    break;
                }
                // Assuming dealer did not get blackjack on first hand
                // Show your cards and one of dealer's cards 
                cardsText.textContent = "Cards: " + this.player.cards;
                console.log("Your cards:",this.player.cards);
                sumText.textContent = "Sum: " + this.player.sumCards();
                console.log("Your card sum:",this.player.sumCards());
                dealerCardsText.textContent = this.dealer.cards[0];
                console.log("Dealer Card:", this.dealer.cards[0]);
                messageText.textContent = "Do you want to draw a new card?";
                
            }else {

                // Check who won. This assumes both player and dealer are done
                // and neither have busted. So it's essentially who has highest card sum
                if(this.playerDone == true && this.dealerDone == true){

                    // Show dealer cards

                    if(this.player.sumCards() > this.dealer.sumCards()){
                        console.log(this.player.sumCards() + 
                                    " beats " + this.dealer.sumCards() + ". You win!");
                        messageText.textContent = this.player.sumCards() + 
                                    " beats " + this.dealer.sumCards() + ". You win!";                      
                    } else if(this.player.sumCards() < this.dealer.sumCards()){
                        console.log(this.dealer.sumCards() + 
                                    " beats " + this.player.sumCards() + ". You lose!");
                        messageText.textContent = this.dealer.sumCards() + 
                                    " beats " + this.player.sumCards() + ". You lose!";

                    } else {
                        console.log(this.dealer.sumCards() + 
                                    " = " + this.player.sumCards() + ". It's a push");
                        messageText.textContent = this.dealer.sumCards() + 
                                    " = " + this.player.sumCards() + ". It's a push";            
                    }
                    this.gameStatus = "over";
                    break;
                }
            }

            // If player is still playing, check whether want to hit or not
            if(this.playerDone == false){
                const hit = prompt("Hit? (Y for yes)");
                    if(hit == "Y"|| hit == "Yes"){
                        this.player.draw();
                        this.dealCount++;
                        console.log("\n");
                        console.log("Current deal count:", this.dealCount);
                        console.log("You received a",this.player.cards[this.player.cards.length-1]);
                        console.log("Your new sum is ", this.player.sumCards());
                        cardsText.textContent = this.player.cards;
                        sumText.textContent = this.player.sumCards();
                        // Deck test
                        // this.deck.summarize();

                        // Check for bust
                        if(this.player.status()=="Bust"){
                            console.log("You busted! You lose :(");
                            messageText.textContent = "You busted! You lose :(";
                            this.gameStatus = "over";
                            //break;
                        }   
                    }else {
                        console.log("Dealer cards are: ", this.dealer.cards);
                        console.log("Dealer cards sum is: ", this.dealer.sumCards());

                        this.playerDone = true;
                    }
            }
            // If dealer is below 16 then they draw, otherwise not
            if(this.playerDone == true){
                while(this.dealer.sumCards()<16){
                    this.dealer.draw();
                    this.dealCount++;
                    console.log("\n");
                    console.log("Current deal count:", this.dealCount);
                    console.log("Dealer received a",this.dealer.cards[this.dealer.cards.length - 1]);
                    console.log("New dealer cards are: ", this.dealer.cards);
                    console.log("New dealer sum is ", this.dealer.sumCards());
                    
                    // Deck test
                    // this.deck.summarize();

                    // Check for bust
                    if(this.dealer.status()=="Bust"){
                        console.log("Dealer busted! You win :)");
                        this.gameStatus = "over";
                    }
                }
                this.dealerDone = true;
            // If made it here, neither you nor dealer have busted. So can continue

            } // While loop
            messageText.textContent = this.status;
            // this.dealCount++;    
            // TODO ask player if they want to play again
        
        
        }


    }
}

export {shuffleArray,generateCard, sumCards, checkAce, createDeck,
        Deck, Hand, Game }

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

// const game = new classes.Game()
// game.dealCards();

// Side tests
// console.log("Player Hand: ", game.player.cards);
// console.log("Dealer Hand: ", game.dealer.cards);
// game.deck.summarize();
//game.dealCards();