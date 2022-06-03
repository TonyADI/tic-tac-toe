import React from 'react';
import './Block.css';

export const Block = ({onClick, turn, position, value}) => {
    const handleClick = () => {
        onClick(turn, position)
    }

    return(
        <button 
            onClick={handleClick} 
            className="block" 
            style={{color: value === 'X' ? '#28a745' : '#ffc107'}}
            disabled={Boolean(value)}>
                {value}
        </button>
    )
    
}

