import {Move} from './Move.js';

let isPlaying = false;
let autoPlayIntervalID;

let stoneMove = new Move('stone','rock-emoji.png');
let paperMove = new Move('paper','paper-emoji.png');
let sissorMove = new Move('sissor','scissors-emoji.png');

let stoneBtnEle = document.querySelector('.js-stone-btn');
let paperBtnEle = document.querySelector('.js-paper-btn');
let sissorBtnEle = document.querySelector('.js-sissor-btn');

let autoPlayEle = document.querySelector('.js-autoplay-btn')

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
            resultText = 'You Win, Computer Lost';
        }else if(playerOption === 'sissor'){
            yourMove = sissorMove;
            resultText = 'You Lost, Computer Win';
        }else{
            yourMove = stoneMove;
            resultText = 'Tie';
        }
    }else if(computerOption == 'paper'){
        computerMove = paperMove;
        if(playerOption === 'paper'){
            yourMove = paperMove;
            resultText = 'Tie';
        }else if(playerOption === 'sissor'){
            yourMove = sissorMove;
            resultText = 'You Win, Computer Lost';
        }else{
            yourMove = stoneMove;
            resultText = 'You Lost, Computer Win';
        }
    }else{
        computerMove = sissorMove;
        if(playerOption === 'paper'){
            yourMove = paperMove;
            resultText = 'You Lost, Computer Win';
        }else if(playerOption === 'sissor'){
            yourMove = sissorMove;
            resultText = 'Tie';
        }else{
            yourMove = stoneMove;
            resultText = 'You Win, Computer Lost';
        }
    }
    
    resultHtml = generateResultHTML(yourMove, computerMove, resultText);
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

function generateResultHTML(yourMove, computerMove, resultText){
    let resultHtml = "";

    resultHtml = `<p class='move-result'> Your Move: <img src='images/${yourMove.moveImage}'> </p>
                  <p class='move-result'> Computer Move: <img src='images/${computerMove.moveImage}'> </p>
                  <h1>${resultText}</h1>`;
    return resultHtml;
}
