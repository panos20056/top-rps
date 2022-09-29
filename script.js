const choices = ['rock', 'paper', 'scissors'];
const patterns = /^(rock|paper|scissors)$/i

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

function computerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function capFirstLetter(text) {
    if (text === null) { return null; }
    return text.charAt(0).toUpperCase() + text.slice(1);
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
        playerSelection = capFirstLetter(playerSelection);
        compSelection = capFirstLetter(compSelection);
        console.log(`${playerSelection} vs ${compSelection}!`);
        if ( compSelection == playerSelection) {
        console.log('tie');
        return 0;
        } else if (playerSelection === 'rock' && compSelection === 'scissors' || playerSelection === 'paper' && compSelection === 'rock' || playerSelection === 'scissors' && compSelection === 'paper') {
            console.log(`Round won! ${playerSelection} beats ${compSelection}`);
            return 1;
        } else {
            console.log(`Round lost. `);
            return 2;
        }
    }
}


function countScore(score1, score2) {
    return score1 == score2 ? 'Tie' :
    score1 > score2 ? 'You win!' :
    'You lose.' ;

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
    if (cancelled) {
        return 'You cancelled the game'
    }
    return countScore(userScore, compScore);
}

