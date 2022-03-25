import * as classes from "./classes.js"


// Add event listeners to button for onclick
const startButton = document.getElementById("start-el");
const messageText = document.getElementById("message-el");
const cardsText = document.getElementById("card-el");
const sumText = document.getElementById("sum-el");

startButton.addEventListener("click", main);

// Create function to start game
function startGame(game){
    // document.getElementById("message-el").textContent = "Do you want to draw a new card?";
    game.dealCards();
}

function main(){
    const game = new classes.Game();
    startGame(game);

    // while(game.gameStatus!="over"){
    //     messageText.textContent = game.status;
    //     cardsText.textContent = game.player.cards;
    //     sumText.textContent = game.player.sumCards;
    // }

}
