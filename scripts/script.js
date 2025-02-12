import {Move} from './Move.js';

let stoneMove = new Move('stone','rock-emoji.png');
let paperMove = new Move('paper','paper-emoji.png');
let sissorMove = new Move('sissor','scissors-emoji.png');

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
    console.log(computerOption + " " + playerOption+ " "+ resultText);
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
window.play = play;