import React, { useState, useEffect } from 'react';
import './App.css';
import { Board } from '../Board/Board';

const App = () => {
    const [currentMove, setCurrentMove] = useState('X');
    const [positions, setPositions] = useState([]);
    const [moves, setMoves] = useState(0);
    const [turn, setTurn] = useState('Your');
    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [playerOneScore, setPlayerOneScore] = useState(0);
    const [playerTwoScore, setPlayerTwoScore] = useState(0);
    const [onePlayer, setOnePlayer] = useState(false);
    const [twoPlayer, setTwoPlayer] = useState(false);

    const handleClick = (turn, position) => {
      positions[position] = twoPlayer ? turn : ' X';
      setPositions([...positions]);
      setMoves(moves + 1);
      setTimeout(() => {
        const winner = calculateWinner([...positions]);
        if(!winner){
          if(twoPlayer){
            const newMove = currentMove === 'X' ? 'O' : 'X';
            setCurrentMove(newMove);
          }
          else{
            setTurn('Computers');
          }
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
      setOnePlayer(false);
      setTwoPlayer(false);
      setPlayerTwoScore(0);
      setPlayerOneScore(0);
      setTurn('Your');
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
              const ans = window.confirm('X wins! Play again?');
              if(ans){
                setPositions([]);
                setMoves(0);
              }
              else{
                reset();
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
                reset();
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

    const setGameType = e => {
      switch(e.target.value){
        case 'one-player':
          setOnePlayer(true);
          setTwoPlayer(false);
          break;
        case 'two-player':
          setTwoPlayer(true);
          setOnePlayer(false);
          break;
        default:
          console.log('Wrong Value');
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
            <button className="menu-button game-type" value="one-player"
            onClick={setGameType}>1 Player</button>
            <button className="menu-button game-type" value="two-player" 
            onClick={setGameType}>2 Player</button>
          </div>
          <div><button className="menu-button" id='reset' onClick={reset}
          >Reset</button></div>
          
          {onePlayer && <div id="one-player-container">
            <div id="scores">{playerScore}:{computerScore}</div>
            <h3>{turn} Turn</h3>
            <Board value={positions} onClick={handleClick} turn={currentMove}/>
          </div>}

          {twoPlayer && <div id="two-player-container">
          <div id="scores">{playerOneScore}:{playerTwoScore}</div>
            <h3>{currentMove}'s Turn</h3>
            <Board value={positions} onClick={handleClick} turn={currentMove}/>
          </div>}
        </div>
    );
}

export default App;