import { getRandomGame } from "../api/Game/Game";
import GameInterface from "../api/Game/GameInterface";
import React from "react";
import "../media/css/TestGame.css";
import {useContext} from "react";
import {loggedInUserContext} from "../App";
import { createRoot, Root } from 'react-dom/client';
import Game from '../api/Game/DinosaurGame';

let currentGame : GameInterface;
let gameContainer:HTMLElement | null = null;
let gameRoot:Root| null = null;
let squares = Array(9).fill(null);
let isWin = false;
  
const Row = (props : any) => {
    return <div className="board-row">{React.Children.map(props.children, (child) => child)}</div>;
}

const Square = (props : any) => {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

function getRandomInt(min: any, max: any) : number{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function checkWin() {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            isWin = true;
            return;
        }
    }
}

function iaPlay() {
    let i = getRandomInt(0, 8);
    while(squares[i] !== null) {
        i = getRandomInt(0, 8);
    }
    squares[i] = "O";
    renderSquare(squares[i]);
    checkWin();
}

function onClick(i :number){
    if(squares[i] === null && !isWin && gameRoot != null)  {     
        squares[i] = "X";
        gameRoot.render(renderGame(1));
        checkWin();
        iaPlay();
        gameRoot.render(renderGame(1));
    } 
}

function renderSquare(i : number) {
    return (
        <Square value={squares[i]} onClick={() => onClick(i)}/>
    );
}

function renderGame(idGame : number){
    let games = Array(3).fill(null);
    games[0]= <div>
    <Row>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
    </Row>
    <Row>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
    </Row>
    <Row>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
    </Row>
</div>;
games[1] = <div>Jeu 2</div>;
games[2] = <div>Jeu 3</div>;
    return (
        games[idGame]
    );
}

function getGame(i : number) {
    getRandomGame(i).then((game) => {
        currentGame = game.data;
    if(gameContainer == null || gameRoot == null) {
        gameContainer = document.getElementById('game');
        gameRoot = createRoot(gameContainer!);
        gameRoot.render(renderGame(currentGame.code));
    }else{
        gameRoot.render(renderGame(currentGame.code));
    }
}).catch((error) => {console.error(error);});
}
export default function TestGame() {
    let loggedInUser = useContext(loggedInUserContext).loggedInUser;
    return (
        <div>
            <div id="game">
              <Game />
            </div>
            <div>
                <button onClick={() => (getGame(loggedInUser.id))}>Get Game</button>
            </div>
      </div>
      
    );
}