const MAX_SCORE = 10;
var player;
var opponent;
var playerScore = 0;
var opponentScore = 0;
var choices = ["paper", "rock", "scissors"];

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
  opponent = choices[Math.floor(Math.random() * choices.length)];
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
      disableChoices();
      //alert("You have won! 😁");
      document.getElementById("win-gif").style.display = "block";
    } else if (opponentScore === MAX_SCORE) {
      disableChoices();
      //alert("You have lost! 😔");
      document.getElementById("lose-gif").style.display = "block";
    }
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
