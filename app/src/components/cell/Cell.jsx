import './Cell.css'
import Piece from '../piece/Piece.jsx'
import React, { Component } from 'react'
import Draggable from 'react-draggable';

export default class Cell extends Component {

    addPiece(piece) {
        // console.log(this.props)
        return <Piece {...this.props} color={piece} />
    }

    selectCell() {
        return ""
    }

    render() {
        return (
            <Draggable>
                <div key={this.props.cell} className={this.props.color}>
                    {this.addPiece(this.props.piece)}
                </div>
            </Draggable>
        )
    }
}


