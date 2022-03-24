import * as classes from "./classes.js"


// Add event listener to button for onclick
const element = document.getElementById("startGame");
element.addEventListener("click", startGame);

// Create function to start game
function startGame(){
    const game = new classes.Game()
    game.dealCards();
}


