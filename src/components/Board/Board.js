import React from 'react';
import { Block } from '../Block/Block';
import './Board.css'

export class Board extends React.Component{
    render(){
        return(
            <div className="board">
                <Block value={this.props.value[0]} onClick={this.props.onClick} position={0} turn={this.props.turn}/>
                <Block value={this.props.value[1]} onClick={this.props.onClick} position={1} turn={this.props.turn}/>
                <Block value={this.props.value[2]} onClick={this.props.onClick} position={2} turn={this.props.turn}/>
                <br/>
                <Block value={this.props.value[3]} onClick={this.props.onClick} position={3} turn={this.props.turn}/>
                <Block value={this.props.value[4]} onClick={this.props.onClick} position={4} turn={this.props.turn}/>
                <Block value={this.props.value[5]} onClick={this.props.onClick} position={5} turn={this.props.turn}/>
                <br/>
                <Block value={this.props.value[6]} onClick={this.props.onClick} position={6} turn={this.props.turn}/>
                <Block value={this.props.value[7]} onClick={this.props.onClick} position={7} turn={this.props.turn}/>
                <Block value={this.props.value[8]} onClick={this.props.onClick} position={8} turn={this.props.turn}/>
            </div>
        )
    }
}