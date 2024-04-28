let userScore = 0; //  track the user score
let computerScore = 0; // track the computer score

let choices = document.querySelectorAll(".choice"); //access all the choices
const msg = document.querySelector("#msg"); // to show the result of the game
const userscorePara = document.querySelector("#user-score"); //  acces the user score
const compscorePara = document.querySelector("#computer-score"); //  acces the computer score
const clearButton = document.querySelector("#clear"); // access clear button

// this function will reset the user and computer score 
const clearScore = () => {
  userScore= 0;
  computerScore = 0;
  userscorePara.innerText = userScore; // if user win update the user score
  compscorePara.innerText = computerScore; // if computer win update computer score
}

clearButton.addEventListener("click", () => {
  clearScore();
})

// this function will be run in case of draw game
const gameDraw = () => {
  msg.innerText = "Game Draw! Play again.";
  msg.style.backgroundColor = "#081b31";
};

// this function will show the winner
const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    // true
    userScore++;
    userscorePara.innerText = userScore; // if user win update the user score
    msg.innerText = `You win! ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    //false
    computerScore++;
    compscorePara.innerText = computerScore; // if computer win update computer score
    msg.innerText = `You lose! ${compChoice} beats ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

// *** this function will generate the computer choice ***
// as there is no such method to generate random choice so we will use a trick
// Math.random(); // this is a function generate a random number  then we will use other function mathfloor which will convert this number into the whole number and by using that random number we will treat this as a index of the array

const computerChoice = () => {
  //rock ,paper , scissors
  const options = ["rock", "paper", "scissor"]; // creating an array storing all the three choices
  // as our arrray elemnt is 3 so we will have to generate the number in the range of 0 to 2
  const randIdx = Math.floor(Math.random() * 3); // math floor is a method use to remove decimal number from the value so it will make the value whole number and * 3 is to generate the number within range of 0 to 2
  return options[randIdx]; // will return the computer choice
};

//**** this function will play the  game  */
const playGame = (userChoice) => {
  //generate computer choice
  const compChoice = computerChoice();

  //  now to actualy show the winner or to play the game we use will use conditions here
  if (userChoice === compChoice) {
    //draw game
    gameDraw();
  } else {
    let userWin = true; //to track whether user is winning or not . at first we set this to true
    if (userChoice === "rock") {
      // computer choice = scrissor or paper
      userWin = compChoice === "paper" ? false : true; //if the choice of the computer was paper then user lose but if the choice of the computer was scirssor then user win
    } else if (userChoice === "paper") {
      //computer shoice = rock or scissor
      userWin = compChoice === "rock" ? true : false; //if the computer choice was rock then user win and if it was sciccor then computer win
    } else {
      // computer choice = rock , paper
      userWin = compChoice === "rock" ? false : true; // if the computer choice was rock then computer win and if it was paper then user win
    }
    showWinner(userWin, userChoice, compChoice); // after the conditon winner show function will be called
  }
};

// *** This function will track the user input ****
// accesing individual choice div using foreach from choices and then add event listen to each
choices.forEach((choice) => {
  //console.log(choice); // recieved each choice one by one using foreach
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id"); //  track the id we clicked
    playGame(userChoice); //after the user choice playgame will be called and userchoice will be send as an arugemnt
  });
});
