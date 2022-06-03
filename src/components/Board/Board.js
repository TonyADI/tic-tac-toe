import React from 'react';
import { Block } from '../Block/Block';
import './Board.css'

export const Board = ({value, onClick, turn}) => {
        return(
            <div className="board">
                <div id="first-row">
                    {[0, 1, 2].map(number => <Block value={value[number]} onClick={onClick} position={number} turn={turn}/>}
                </div>
                <div id="second-row">
                    {[3, 4, 5].map(number => <Block value={value[number]} onClick={onClick} position={number} turn={turn}/>}
                </div>
                <div id="third-row">
                    {[6, 7, 8].map(number => <Block value={value[number]} onClick={onClick} position={number} turn={turn}/>}
                </div>
            </div>
        )
}
