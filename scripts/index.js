import * as classes from "./classes.js"


// Add event listeners to button for onclick
const startButton = document.getElementById("start-el");
const drawButton = document.getElementById("newcard-el");
const stayButton = document.getElementById("stay-el");
const drawCardAction = document.getElementById("drawcard-el");
const replayButton = document.getElementById("replay-el");
// const stayAction = document.getElementById("stay-el");

// create Game object
//const game = new classes.Game()

const game = new classes.Game();

startButton.addEventListener("click", main);
drawButton.addEventListener("click", clickDrawCard);
stayButton.addEventListener("click", clickStay);
replayButton.addEventListener("click", playAgain);



// Create function to start game
function startGame(){
    // document.getElementById("message-el").textContent = "Do you want to draw a new card?";
    game.initialHand();
}

function clickDrawCard(){    
    drawCardAction.textContent = "draw";
    game.drawHand();
}

function clickStay(){
    drawCardAction.textContent = "stay";
    game.stayHand();
}

function playAgain(){
    location.reload();
}


function main(){
    startGame();

    // while(game.gameStatus!="over"){
    //     messageText.textContent = game.status;
    //     cardsText.textContent = game.player.cards;
    //     sumText.textContent = game.player.sumCards;
    // }

}


