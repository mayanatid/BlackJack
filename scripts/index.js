import * as classes from "./classes.js"


//DOM Elements
const dealerCards = document.getElementById("dealer-card-el");
const dealerSum = document.getElementById("dealer-sum-el");
const playerCards = document.getElementById("card-el");
const playerSum = document.getElementById("sum-el");

const messageText = document.getElementById("message-el");
const startButton = document.getElementById("start-el");
const drawButton = document.getElementById("newcard-el");
const stayButton = document.getElementById("stay-el");
const drawCardAction = document.getElementById("drawcard-el");
const replayButton = document.getElementById("replay-el");
const betDiv = document.getElementById("bet-div")
const betInput = document.getElementById("bet-el");
const buttonControl = document.getElementById("button-control-div");
const currBetText = document.getElementById("current-bet-el");
const dblDownButton = document.getElementById("dbl-el");
let bankrollInput = document.getElementById("bankroll-input-el");
const bankrollButton = document.getElementById("bankroll-btn-el");
const bankrollDiv = document.getElementById("set-bankroll-el");
const bankrollTotal = document.getElementById("bankroll-total-el");
const cardDispDiv = document.getElementById("card-display-el");
// const stayAction = document.getElementById("stay-el");

// create Game object
//const game = new classes.Game()

const game = new classes.Game();

// startButton.addEventListener("click", main);
// drawButton.addEventListener("click", clickDrawCard);
// stayButton.addEventListener("click", clickStay);
// replayButton.addEventListener("click", playAgain);

function doubleDown(){
    game.player.bet *= 2;
    currBetText.textContent = "Current Bet: $" + game.player.bet;
    dblDownButton.hidden=true;
    game.drawHand();
    game.stayHand();
    bankrollTotal.textContent ="Bankroll: $" + game.player.bankroll;
}

// On page load, will need to set play bankroll
function setBankroll(){

    //let input = window.prompt("Set your bankroll")
    game.player.setBankroll(bankrollInput.value);
    bankrollDiv.hidden=true;
    messageText.hidden=false;
    betDiv.hidden=false;
    bankrollTotal.hidden=false;
    bankrollTotal.textContent ="Bankroll: $" + game.player.bankroll;

}

// Create function to start game
function startGame(){
    // Check to see if bet is bigger than bankroll
    let bet = betInput.value;
    if(bet > game.player.bankroll){
        window.alert("Can't set bet bigger than bankroll!");
        betInput.value = game.player.bankroll;
    } else {
        game.player.setBet(bet);
        game.initialHand();
        bankrollTotal.textContent ="Bankroll: $" + game.player.bankroll;
        currBetText.textContent = "Current Bet: $" + bet;
        console.log("Player bankroll is", game.player.bankroll);
        console.log("Player Bet is: ", game.player.bet);
    }
}

function clickDrawCard(){    
    drawCardAction.textContent = "draw";
    dblDownButton.hidden=true;
    game.drawHand();
    console.log("Bankroll: $" + game.player.bankroll);
    bankrollTotal.textContent ="Bankroll: $" + game.player.bankroll;
}

function clickStay(){
    drawCardAction.textContent = "stay";
    dblDownButton.hidden=true;
    game.stayHand();
    console.log("Bankroll: $" + game.player.bankroll);
    bankrollTotal.textContent ="Bankroll: $" + game.player.bankroll;
}

function playAgain(){
    // Store bankroll to set after new player created
    let tempBankroll = game.player.bankroll;
    game.player = new classes.Hand(false,game.deck);
    game.player.setBankroll(tempBankroll);
    game.dealer = new classes.Hand(true,game.deck);
    console.log("Player cards: ", game.player.cards);
    console.log("Dealer cards: ", game.dealer.cards);
    console.log(game.deck.summarize());

    // UI configurations
    buttonControl.hidden=true;
    startButton.hidden=false;
    replayButton.hidden=true;
    betDiv.hidden=false;
    //messageText.hidden=true;

    messageText.textContent = "";
    dealerCards.textContent = "Cards: ";
    dealerSum.textContent = "Sum: ";
    playerCards.textContent ="Cards: "; 
    playerSum.textContent = "Sum: ";


    //startGame();
}


function main(){
    startGame();

    // while(game.gameStatus!="over"){
    //     messageText.textContent = game.status;
    //     cardsText.textContent = game.player.cards;
    //     sumText.textContent = game.player.sumCards;
    // }

}

bankrollButton.addEventListener("click", setBankroll);
startButton.addEventListener("click", main);
drawButton.addEventListener("click", clickDrawCard);
stayButton.addEventListener("click", clickStay);
replayButton.addEventListener("click", playAgain);
dblDownButton.addEventListener("click", doubleDown);


