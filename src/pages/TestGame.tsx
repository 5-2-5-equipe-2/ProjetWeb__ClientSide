import UserInterface from "../api/User/UserInterface";
import {Grid} from "@mui/material";
import React from "react";
import "../media/css/TestGame.css";

let squares = Array(9).fill(null);
let xIsNext = true;
  
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


function onClick(i :number){
    if(squares[i] === null) {
        squares[i] = xIsNext ? "X" : "O";
        xIsNext = !xIsNext;
        renderSquare(squares[i]);
    } 
}

function renderSquare(i : number) {
    return (
        <Square value={squares[i]} onClick={() => onClick(i)}/>
    );
}

export default function TestGame() {
    return (
        <div>
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
      </div>
    );
}