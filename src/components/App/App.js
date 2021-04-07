import React from 'react';
import './App.css';
import { Board } from '../Board/Board';

class App extends React.Component{
    constructor(props){
      super(props);
      const randomMove = ['X', 'O'][Math.floor(Math.random()*2)]
      this.state = {currentMove: randomMove, moveList: []}
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick(turn, position){
      if(this.state.moveList.every(item => { return item === 'X' || item === 'O'}) && this.state.moveList.length === 8){
        alert('Game Over!')
      }
      const newMove = this.state.currentMove === 'X' ? 'O' : 'X';
      const moves = [...this.state.moveList];
      moves[position] = turn;
      this.setState({moveList: [...moves], currentMove: newMove})
      console.log(this.state.moveList)
    }
    
    render(){
      return (
        <div className="App-body">
          <h1>{this.state.currentMove}'s Turn</h1>
          <Board value={this.state.moveList} onClick={this.handleClick} turn={this.state.currentMove}/>
        </div>
      );
    }
}

export default App;
