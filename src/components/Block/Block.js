import React from 'react';
import './Block.css';

export const Block = props => {
    const handleClick = () => {
        props.onClick(props.turn, props.position)
    }

    return(
        <button onClick={handleClick} className="block" 
        style={{color: props.value === 'X' ? '#28a745' : '#ffc107'}}
        disabled={props.value}>
           {props.value}
        </button>
    )
    
}

