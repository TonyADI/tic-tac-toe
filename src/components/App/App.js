import React, { useState, useEffect } from 'react';
import './App.css';
import { Board } from '../Board/Board';

const App = () => {
    const [currentMove, setCurrentMove] = useState('X');
    const [positions, setPositions] = useState([]);
    const [moves, setMoves] = useState(0);
    const [playerOneScore, setPlayerOneScore] = useState(0);
    const [playerTwoScore, setPlayerTwoScore] = useState(0);
    const [won, setWon] = useState(false);

    const handleClick = (turn, position) => {
      positions[position] = turn;
      setPositions([...positions]);
      setMoves(moves + 1);
      setTimeout(() => {
        const winner = calculateWinner([...positions]);
        if(!winner){
          const newMove = currentMove === 'X' ? 'O' : 'X';
          setCurrentMove(newMove);
        }
      })
    }

    const reset = () => {
      setPositions([]);
      setMoves(0);
    }

    const calculateWinner = positions => {
      if(moves > 3){
        const lines = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
          [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (positions[a] && positions[a] === positions[b] && positions[a] === positions[c]) {
            if(positions[a] === 'X'){
              const ans = window.confirm('X wins! Play again?');
              if(ans){
                setPositions([]);
                setMoves(0);
              }
              else{
                //menu
              }
              setPlayerOneScore(playerOneScore + 1);
            }
            else{
              const ans = window.confirm('O wins! Play again?');
              if(ans){
                setPositions([]);
                setMoves(0);
              }
              else{
                //menu
              }
              setPlayerTwoScore(playerTwoScore + 1);
            }
          }
        }
      }
      if(moves === 8){
        const ans = window.confirm('Game Over! No winner. Try Again?');
        if(ans){
          setPositions([]);
          setMoves(0);
        }
      }
    }

    return (
        <div className="App-body">
          <h1>Tic Tac Toe</h1>
          <div id="menu">
            <button className="menu-button game-type">1 Player</button>
            <button className="menu-button game-type">2 Player</button>
          </div>
          <div><button className="menu-button" id='reset' onClick={reset}
          >Reset</button></div>
          <div>
          <div id="scores">{playerOneScore}:{playerTwoScore}</div>
            <h3>{currentMove}'s Turn</h3>
            <Board value={positions} onClick={handleClick} turn={currentMove}/>
          </div>
        </div>
    );
}

export default App;