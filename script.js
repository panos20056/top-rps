const choices = ['rock', 'paper', 'scissors'];
const patterns = /^(rock|paper|scissors)$/i

// Tests user input against the 'patterns' regex
//returns the input in lower case to be able to compare against computer choice
//returns null if prompt is cancelled or empty
function checkInput(regex, text) {
    return regex.test(text);
    
}

function playerChoice() {
    let playerInput = prompt('Weapon of choice');
    if (checkInput(patterns, playerInput)) {
        playerInput = playerInput.toLowerCase();
        return playerInput;
    } else if (playerInput === null) {
        return null;
    } else  {    
        return playerChoice();
    }    
}
// lets computer choose from array of options
function computerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

// plays a single round of rock paper scissors
// cancels the round if player choice is empty or cancelled
// announces both player and computer selections and compares them
// returns 0 for tie, 1 for player victory, 2 for computer victory and announces round result
function playRound() {
    let compSelection = computerChoice();
    let playerSelection = playerChoice();
    
    if (playerSelection === null) {
        return;
    } else {
        console.log(`opponent chose ${compSelection} vs your ${playerSelection}`);
        if ( compSelection == playerSelection) {
        console.log('tie');
        return 0;
        } else if (playerSelection == 'rock') {
            if (compSelection == 'scissors') {
                console.log('You win, Rock beats Scissors');
                return 1;
            } else { 
                console.log('You lose, Rock loses to Paper');
                return 2;
            }
        } else if (playerSelection == 'paper') {
            if (compSelection == 'rock') {
                console.log('You win, Paper beats Rock');
                return 1;
            } else { 
                console.log('You lose, Paper loses to Scissors');
                return 2;
            }
        } else if (playerSelection == 'scissors') {
            if (compSelection == 'paper') {
                console.log('You win, Scissors beats Paper');
                return 1;
            } else { 
                console.log('You lose, Scissors loses to Rock');
                return 2;
            }
        } 
    }
}


//calls the playround() up to 5 times
/* increases user score or comuter score by 1 each time one of them wins, leaves them 
the same if its' a tie 

if playround() returns undefined (which means prompt was cancelled) cancels loop
and returns game canceled message, using the cancelled variable

if loop is completed, announces the winner or tie*/
//

function playGame() {
    let userScore = 0;
    let compScore = 0;
    let cancelled = false;
    for (let i = 1; i < 6; i++){
        if (Math.abs(userScore - compScore) <= 6 - i) {
            console.log('Round ', i)
            let roundResult = playRound();
            if (roundResult == 1) {
                userScore += 1;
            } else if (roundResult == 2) {
                compScore += 1;
            } else if (roundResult === undefined) {
                cancelled = true;
                break;
            } else {
                continue;
            }
        }
        console.log(userScore, compScore); 
        
    } 
    if (userScore > compScore && !cancelled) {
        return 'Congratulations, you won!';
    } else if (compScore > userScore && !cancelled) {
        return 'You lost! Better luck next time!';
    } else if (compScore == userScore && !cancelled)  {
        return 'Tie';
    } else {
        return 'You cancelled the game';
    }   
}

