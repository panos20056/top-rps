const choices = ['Rock', 'Paper', 'Scissors'];
// const patterns = /^(rock|paper|scissors)$/i;
const buttons = document.querySelectorAll('.choice');
const main = document.querySelector('main');
const texts = document.querySelector('#texts');
const selectionText = document.createElement('p');
const userCurrentScoreText = document.querySelector('#userCurrentScore');
const compCurrentScoreText = document.querySelector('#compCurrentScore');
const resultPara = document.createElement('p');
let userScore = 0;
let compScore = 0;
buttons.forEach(button => button.addEventListener('click', game));



function computerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}


// plays a single round of rock paper scissors
// announces both player and computer selections and compares them
// returns 0 for tie, 1 for player victory, 2 for computer victory and announces round result
function playRound(buttonChoice) {
    let compSelection = computerChoice();
    let roundValue;
    selectionText.textContent = `${buttonChoice} vs ${compSelection}!`;
    texts.appendChild(selectionText);
    if ( compSelection == buttonChoice) {
        resultPara.textContent = 'tie';
        roundValue = 0;
    } else if (buttonChoice === 'Rock' && compSelection === 'Scissors' || 
                buttonChoice === 'Paper' && compSelection === 'Rock' || 
                buttonChoice === 'Scissors' && compSelection === 'Paper') {
        resultPara.textContent = `Round won! ${buttonChoice} beats ${compSelection}`;
        roundValue = 1;
    } else {
         resultPara.textContent = `Round lost. `;
        roundValue = 2;
    }
    texts.appendChild(resultPara);
    return roundValue;
}

function game(e) {
    let playerChoice = e.target.textContent;
    let roundResult = playRound(playerChoice);
    if (roundResult == 1) {userScore++;}
    else if (roundResult == 2) {compScore++;}
    userCurrentScoreText.textContent = userScore + ' ';
    compCurrentScoreText.textContent = compScore; 
    if (userScore == 5) {
        resultPara.textContent = 'Congratulations! You won the game!'
        buttons.forEach(button => button.removeEventListener('click', game));
        newGame();
    } else if (compScore == 5) {
        resultPara.textContent = 'You lose! Git gud' 
        buttons.forEach(button => button.removeEventListener('click', game));
        newGame();
    }
}

function newGame() {
    const newGameButton = document.createElement('button');
    newGameButton.textContent = 'New game';
    texts.appendChild(newGameButton);
    newGameButton.addEventListener('click', () => {
        userScore = 0;
        compScore = 0;
        userCurrentScoreText.textContent = userScore;
        compCurrentScoreText.textContent = compScore;
        resultPara.textContent = '';
        selectionText.textContent = '';
        buttons.forEach(button => button.addEventListener('click', game));
        texts.removeChild(newGameButton);
    })
    
}

 