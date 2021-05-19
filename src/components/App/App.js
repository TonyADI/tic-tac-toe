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
    const [computerMoves, setComputerMoves] = useState([]);
    const [playerMoves, setPlayerMoves] = useState([]);
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
      [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],
    ];

    const handleClick = (turn, position) => {
      positions[position] = twoPlayer ? turn : 'X';
      setPositions([...positions]);
      setMoves(moves + 1);
      setPlayerMoves([...playerMoves, position])
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

    const suggestedComputerMove = (computer = 'O') => {
      if(moves === 0){
        const optimalPositions = [0, 2, 6, 8];
        const randomMove = optimalPositions[Math.floor(Math.random()*optimalPositions.length)];
        positions[randomMove] = computer;
        setComputerMoves([...computerMoves, randomMove]);
      }
      else if(moves === 1){
        if(positions[4]){
          const optimalPositions = [0, 2, 6, 8];
          const randomMove = optimalPositions[Math.floor(Math.random()*optimalPositions.length)];
          positions[randomMove] = computer;
          setPositions([...positions]);
          setComputerMoves([...computerMoves, randomMove]);
        }
        else{
          positions[4] = computer;
          setPositions([...positions]);
          setComputerMoves([...computerMoves, 4]);
          computerMoves.push(4);
        }
      }
      else if(moves === 2){
        // could be better
        const availablePositions = findAvailablePositions();
        const randomMove = availablePositions[Math.floor(Math.random() * 
          availablePositions.length)];
        positions[randomMove] = computer;
        setPositions([...positions]);
        setComputerMoves([...computerMoves, randomMove])
      }
      else if(moves === 3){
        for (let i = 0; i < lines.length; i++) {
          if(lines[i].indexOf(playerMoves[0]) > -1 && lines[i].indexOf(playerMoves[1]) > -1){
            const optimalMove = lines[i].find(item => 
              item !== playerMoves[0] && item !== playerMoves[1]);
            // checks if i already blocked the move
            if(!positions[optimalMove]){
              positions[optimalMove] = computer;
              setPositions([...positions]);
              setComputerMoves([...computerMoves, optimalMove]);
              setTurn('Your');
              setMoves(moves + 1)
              return null;
            }
            break;
          }
        }
        const availablePositions = findAvailablePositions();
        const randomMove = availablePositions[Math.floor(Math.random() * 
          availablePositions.length)];
        positions[randomMove] = computer;
        setPositions([...positions]);
        setComputerMoves([...computerMoves, randomMove]);
      }
      else if(moves >= 4){
        console.log(moves);
        console.log(playerMoves.length)
        // works fine if i play first
        for (let i = 0; i < lines.length; i++) {
          if(lines[i].indexOf(computerMoves[moves - 4]) > -1 && lines[i].indexOf(computerMoves[moves - 5]) > -1){
            console.log(false)
            const optimalMove = lines[i].find(item => 
              item !== computerMoves[moves - 4] && item !== computerMoves[moves - 5]);
              console.log(optimalMove)
            if(!positions[optimalMove]){
              positions[optimalMove] = computer;
              setPositions([...positions]);
              setComputerMoves([...computerMoves, optimalMove]);
              setMoves(moves + 1);
              setTimeout(() => {
                const winner = calculateWinner([...positions]);
                if(!winner){
                  setTurn('Your');  
                }
              }, 0);
              return null;
            }
            break;
          }
        }
        // account for all combinations, compare newest move to all moves, 2 move difference only works when i go first
        for (let i = 0; i < lines.length; i++) {
          if((lines[i].indexOf(playerMoves[moves - 3]) > -1 && lines[i].indexOf(playerMoves[moves - 5]) > -1) ||
          (lines[i].indexOf(playerMoves[moves - 4]) > -1 && lines[i].indexOf(playerMoves[moves - 5]) > -1)){
            console.log(true)
            const optimalMove = lines[i].find(item => 
              item !== playerMoves[moves - 3] && item !== playerMoves[moves - 5] && item !== playerMoves[moves - 4]);
            if(!positions[optimalMove]){
              positions[optimalMove] = computer;
              setPositions([...positions]);
              setComputerMoves([...computerMoves, optimalMove]);
              setMoves(moves + 1);
              setTimeout(() => {
                const winner = calculateWinner([...positions]);
                if(!winner){
                  setTurn('Your');  
                }
              }, 0);
              return null;
            }
            break;
          }
        }
        // search for optimal move while trying to block opponent?
        const availablePositions = findAvailablePositions();
        const randomMove = availablePositions[Math.floor(Math.random() * 
          availablePositions.length)];
        positions[randomMove] = computer;
        setPositions([...positions]);
        setComputerMoves([...computerMoves, randomMove]);
      }
      setMoves(moves + 1);
      setTurn('Your');
    }

    const reset = () => {
      setPositions([]);
      setMoves(0);
      setPlayerTwoScore(0);
      setPlayerOneScore(0);
      setTurn('Your');
      setPlayerScore(0);
      setComputerScore(0);
      setPlayerMoves([]);
      setComputerMoves([])
    }

    const calculateWinner = positions => {
      if(moves > 3){
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (positions[a] && positions[a] === positions[b] && positions[a] === positions[c]) {
            if(positions[a] === 'X'){
              const ans = window.confirm('X wins! Play again?');
              if(ans){
                setPositions([]);
                setMoves(0);
                setPlayerMoves([]);
                setComputerMoves([]);
                if(onePlayer){
                  setPlayerScore(playerScore + 1);
                  setTurn('Computers');
                }
                else{
                  setPlayerOneScore(playerOneScore + 1);
                }
              }
              else{
                reset();
              }
            }
            else{
              const ans = window.confirm('O wins! Play again?');
              if(ans){
                setPositions([]);
                setMoves(0);
                setPlayerMoves([]);
                setComputerMoves([]);
                if(onePlayer){
                  setComputerScore(computerScore + 1);
                  setTurn('Your');
                }
                else{
                  setPlayerTwoScore(playerTwoScore + 1);
                }
              }
              else{
                reset();
              }
            }
            return true;
          }
        }
        if(moves === 8){
          const ans = window.confirm('Game Over! No winner. Try Again?');
          if(ans){
            setPositions([]);
            setMoves(0);
            setPlayerMoves([]);
            setComputerMoves([]);
          }
        }
        return false;
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
      setMoves(0);
      setPositions([]);
      setPlayerOneScore(0);
      setPlayerTwoScore(0);
      setPlayerScore(0);
      setComputerScore(0);
    }

    useEffect(() => {
      if(turn === 'Computers'){
        setTimeout(suggestedComputerMove, 500);
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
          <div><button className="menu-button" id='reset' onClick={reset}>
            Reset</button></div>
          
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