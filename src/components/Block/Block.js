import React from 'react';
import './Block.css';

export class Block extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        this.props.onClick(this.props.turn, this.props.position)
    }
    render(){
        return(
            <button onClick={this.handleClick} className="v-align" disabled={this.props.value}>{this.props.value}
            </button>
        )
    }
}

