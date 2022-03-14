const MAX_SCORE = 10;
var player;
var opponent;
var playerScore = 0;
var opponentScore = 0;

const choices = ["paper", "rock", "scissors"];
const gifsWinArray = [
  "https://giphy.com/embed/5n045kl6TL1Jubg6oQ",
  "https://giphy.com/embed/gd0Dqg6rYhttBVCZqd",
  "https://giphy.com/embed/3kD720zFVu22rfIA0s",
  "https://giphy.com/embed/3o72EWtjXLzk1Az7P2",
  "https://giphy.com/embed/zaqclXyLz3Uoo",
];
const gifsLoseArray = [
  "https://giphy.com/embed/3o7TKr3nzbh5WgCFxe",
  "https://giphy.com/embed/cr9vIO7NsP5cY",
  "https://giphy.com/embed/1ryrwFNXqNjC8",
  "https://giphy.com/embed/fw8XWwT5YuSJGBwddf",
  "https://giphy.com/embed/tw0xsY7gXcLIfnfFfc",
];

// Make the choices visible
window.onload = function () {
  for (let i = 0; i < choices.length; i++) {
    let choice = document.createElement("img");
    choice.id = choices[i];
    choice.src = "./images/" + choices[i] + ".png";
    choice.addEventListener("click", selectChoice);
    choice.style = "animation: bounce; animation-duration: 2s;";
    document.getElementById("choises").append(choice);
  }
};

// Function send the choise of the player to the board and make the opponent choise
function selectChoice() {
  // Make player choise
  player = this.id;
  document.getElementById("player-choise").src = "./images/" + player + ".png";
  document.getElementById("player-choise").style =
    "animation: flipInX; animation-duration: 0.5s;";
  // Make opponent choise (random)
  opponent = getRandomElFromArr(choices);
  document.getElementById("opponent-choise").src =
    "./images/" + opponent + ".png";
  document.getElementById("opponent-choise").style =
    "animation: flipInX; animation-duration: 0.5s;";

  // Update the game
  checkRoundWinner(player, opponent);
  document.getElementById("player-score").innerText = playerScore;
  document.getElementById("opponent-score").innerText = opponentScore;

  // Check if the game ended
  whoWon(playerScore, opponentScore);
}

// Function taht update who won this round or tie
function checkRoundWinner(player, opponent) {
  if (player === opponent) {
    playerScore += 1;
    opponentScore += 1;
  } else {
    if (player === "rock") {
      if (opponent === "scissors") {
        playerScore += 1;
      } else if (opponent === "paper") {
        opponentScore += 1;
      }
    } else if (player === "scissors") {
      if (opponent === "paper") {
        playerScore += 1;
      } else if (opponent === "rock") {
        opponentScore += 1;
      }
    } else if (player === "paper") {
      if (opponent === "rock") {
        playerScore += 1;
      } else if (opponent === "scissors") {
        opponentScore += 1;
      }
    }
  }
}

// Function that check if player or opponent his finished the game
function whoWon(playerScore, opponentScore) {
  if (playerScore === MAX_SCORE || opponentScore === MAX_SCORE) {
    if (playerScore === MAX_SCORE) {
      //alert("You have won! 😁");
      document.querySelector("#win-gif>iframe").src =
        getRandomElFromArr(gifsWinArray);
      document.getElementById("win-gif").style.display = "block";
    } else if (opponentScore === MAX_SCORE) {
      //alert("You have lost! 😔");
      document.querySelector("#lose-gif>iframe").src =
        getRandomElFromArr(gifsLoseArray);
      document.getElementById("lose-gif").style.display = "block";
    }
    disableChoices();
    document.getElementById("player-choise").style.display = "none";
    document.getElementById("opponent-choise").style.display = "none";
    document.getElementById("reset-btn").style.display = "block";
  }
}

// Function that remove the click (eventListner)
function disableChoices() {
  for (let i = 0; i < choices.length; i++) {
    document
      .getElementById(choices[i])
      .removeEventListener("click", selectChoice);
  }
}

// Function that make the click avilable (eventListner)
function avilableChoices() {
  for (let i = 0; i < choices.length; i++) {
    document.getElementById(choices[i]).addEventListener("click", selectChoice);
  }
}

// Function that reset the game
function resetGame() {
  playerScore = 0;
  opponentScore = 0;
  document.getElementById("player-score").innerText = playerScore;
  document.getElementById("opponent-score").innerText = opponentScore;
  avilableChoices();
  document.getElementById("player-choise").style.display = "";
  document.getElementById("opponent-choise").style.display = "";
  document.getElementById("player-choise").removeAttribute("src");
  document.getElementById("opponent-choise").removeAttribute("src");
  document.getElementById("win-gif").style.display = "none";
  document.getElementById("lose-gif").style.display = "none";
  document.getElementById("reset-btn").style.display = "none";
}

// Function return a random element from array
function getRandomElFromArr(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
