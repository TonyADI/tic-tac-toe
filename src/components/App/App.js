import React, { useState, useEffect } from 'react';
import './App.css';
import { Board } from '../Board/Board';

const App = () => {
    const randomMove = ['X', 'O'][Math.floor(Math.random()*2)]
    const [currentMove, setCurrentMove] = useState(randomMove);
    const [positions, setPositions] = useState([]);
    const [moves, setMoves] = useState(0);
    const [won, setWon] = useState(false);
    const [turn, setTurn] = useState('Your');
    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);

    const handleClick = (turn, position) => {
      positions[position] = 'X';
      setPositions([...positions]);
      setMoves(moves + 1);
      setTimeout(() => {
        const winner = calculateWinner([...positions]);
        if(!winner){
          setTurn('Computers');
        }
      }, 0);
    }

    const findAvailablePositions = () => {
      let availablePositions = []
      for(let i = 0; i < 9; i++){
        if(!positions[i]){
          availablePositions.push(i);
        }
      }
      return availablePositions;
    }

    const randomComputerMove = (computer = 'O') => {
      console.log(1)
      const availablePositions = findAvailablePositions();
      const randomMove = availablePositions[Math.floor(Math.random() * 
        availablePositions.length)];
      positions[randomMove] = computer;
      setPositions([...positions]);
      setMoves(moves + 1);
      setTimeout(() => {
        const winner = calculateWinner([...positions]);
        if(!winner){
          setTurn('Your');
        }
      }, 0);
    }

    const reset = () => {
      setPositions([]);
      setMoves(0);
      setPlayerScore(0);
      setComputerScore(0);
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
              const ans = window.confirm('You won! Keep playing?');
              if(ans){
                setPositions([]);
                setMoves(0);
              }
              else{
                //menu
              }
              setPlayerScore(playerScore + 1);
            }
            else{
              const ans = window.confirm('Better luck next time! Try again?');
              if(ans){
                setPositions([]);
                setMoves(0);
                setTurn('Your');
              }
              else{
                //menu
              }
              setComputerScore(computerScore + 1);
            }
            return true;
          }
        }
        if(moves === 9){
          const ans = window.confirm('Game Over! No winner. Try Again?');
          if(ans){
            setPositions([]);
            setMoves(0);
            setTurn('Your');
          }
          else{
            // menu
          }
        }
        return false;
      }
    }

    useEffect(() => {
      if(turn === 'Computers'){
        setTimeout(randomComputerMove, 500);
      }
    }, [turn])

    return (
        <div className="App-body">
          <h1>Tic Tac Toe</h1>
          <div id="menu">
            <button className="menu-button game-type">1 Player</button>
            <button className="menu-button game-type">2 Player</button>
          </div>
          <div><button className="menu-button" id='reset' onClick={reset}
          >Reset</button></div>
          <div id="scores">{playerScore}:{computerScore}</div>
          <h3>{turn} Turn</h3>
          <Board value={positions} onClick={handleClick} turn={currentMove}/>
        </div>
    );
}

export default App;
