import {Move} from './Move.js';

let isPlaying = false;
let autoPlayIntervalID;
let playerResult = -1;

let stoneMove = new Move('stone','rock-emoji.png');
let paperMove = new Move('paper','paper-emoji.png');
let sissorMove = new Move('sissor','scissors-emoji.png');

let stoneBtnEle = document.querySelector('.js-stone-btn');
let paperBtnEle = document.querySelector('.js-paper-btn');
let sissorBtnEle = document.querySelector('.js-sissor-btn');

let autoPlayEle = document.querySelector('.js-autoplay-btn');
let resetScoreBtnEle = document.querySelector('.js-resetScore-btn');
let scoreBoardEle = document.querySelector('.js-score-board');

scoreBoardEle.innerHTML = `Player Score: ${localStorage.getItem('playerScore')} || Computer Score: ${localStorage.getItem('computerScore')}`;

!localStorage.getItem('playerScore')?localStorage.setItem('playerScore',0):{};
!localStorage.getItem('computerScore')?localStorage.setItem('computerScore',0):{};

stoneBtnEle.addEventListener('click',()=>{
    play('stone');
});

paperBtnEle.addEventListener('click',()=>{
    play('paper');
});

sissorBtnEle.addEventListener('click',()=>{
    play('sissor');
});

autoPlayEle.addEventListener('click',()=>{
    if(isPlaying){
        clearInterval(autoPlayIntervalID);
        isPlaying = false;
    }else{
        autoPlayIntervalID = setInterval(()=>{
            autoPlay();
        },500);
        isPlaying = true;
    }
});
resetScoreBtnEle.addEventListener('click',()=>{
    localStorage.setItem('playerScore',0);
    localStorage.setItem('computerScore',0);
    updateScoresLocal();
});
export function autoPlay(){
    let autoMove = getComputerOption();
    play(autoMove);
}
export function play(playerOption){
    let resultHtml = "";
    let resultText = "";
    let computerOption = getComputerOption();
    let yourMove;
    let computerMove;
    if(computerOption === 'stone'){
        computerMove = stoneMove;
        if(playerOption === 'paper'){
            yourMove = paperMove;
            playerResult = 1;
        }else if(playerOption === 'sissor'){
            playerResult = 0;
            yourMove = sissorMove;
        }else{
            yourMove = stoneMove;
            playerResult = -1;
        }
    }else if(computerOption == 'paper'){
        computerMove = paperMove;
        if(playerOption === 'paper'){
            yourMove = paperMove;
            playerResult = -1;
        }else if(playerOption === 'sissor'){
            yourMove = sissorMove;
            playerResult = 1;
        }else{
            yourMove = stoneMove;
            playerResult = 0;
        }
    }else{
        computerMove = sissorMove;
        if(playerOption === 'paper'){
            yourMove = paperMove;
            playerResult = 0;
        }else if(playerOption === 'sissor'){
            yourMove = sissorMove;
            playerResult = -1;
        }else{
            yourMove = stoneMove;
            playerResult = 1;
        }
    }
    
    resultHtml = generateResultHTML(yourMove, computerMove, playerResult);
    let resultEle = document.querySelector('.js-result');
    resultEle.innerHTML = resultHtml;
}

function getComputerOption(){
    let n = Math.trunc((Math.random() * 10)%3)+ 1;
    if(n == 1){
        return 'stone';
    }else if (n == 2){
        return 'paper';
    }
    return 'scissor';
}

function generateResultHTML(yourMove, computerMove, playerResult){
    let resultHtml = "";
    let resultText = "";
    if(playerResult === 0){
        localStorage.setItem('computerScore',
            Number(localStorage.getItem('computerScore')) + 1
        );
        resultText = 'You Lost, Computer Win';
    }else if(playerResult === 1){
        localStorage.setItem('playerScore',
            Number(localStorage.getItem('playerScore')) + 1
        );
        resultText = 'You Win, Computer Lost';
    } else{
        resultText = 'Tie';
    }

    updateScoresLocal();
    resultHtml = `<p class='move-result'> Your Move: <img src='images/${yourMove.moveImage}'> </p>
                  <p class='move-result'> Computer Move: <img src='images/${computerMove.moveImage}'> </p>
                  <h1>${resultText}</h1>`;
    return resultHtml;
}

function updateScoresLocal(){
    scoreBoardEle.innerHTML = `Player Score: ${localStorage.getItem('playerScore')} || Computer Score: ${localStorage.getItem('computerScore')}`;
}
