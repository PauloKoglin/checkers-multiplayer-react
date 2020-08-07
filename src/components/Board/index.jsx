import React from 'react'
import { connect } from 'react-redux'

import './styles.css'
import types from '../../types'

import Square from '../Square'
import socket from '../../webSocket'

const onClick = (props, square, index) => {
    if (props.isWatingForPlayer)
        return

    if (props.isNextPlayer) {
        if (!props.selectedSquareIndex || square.isSelected) {
            if (square.piece.isMovable)
                return socket.emit('select_square', {
                    room: props.game.room,
                    clickedSquare: square
                });
        }

        if (square.isPossibleMove)
            return socket.emit('move_piece_to', {
                room: props.game.room,
                selectedIndex: props.selectedSquareIndex,
                index
            });
    }

    return null
}

function renderSquares(props) {
    return props.squares.map((square, index) => {
        return (
            <Square
                key={index}
                {...square}
                onClick={() => onClick(props, square, index)}>
            </Square>
        )
    });
}

function Board(props) {
    let disabled;
    if (props.isWatingForPlayer)
        disabled = 'disabled';

    return (
        <div>
            <div id='game-board-container' className={disabled}>
                {renderSquares(props)}
            </div>
        </div>)
}

function mapStateToProps(state) {
    let isNextPlayer = false;

    if (state.game.player.pieceColor === types.YELLOW_PIECE)
        isNextPlayer = state.game.isWhiteNext;

    if (state.game.player.pieceColor === types.RED_PIECE)
        isNextPlayer = !state.game.isWhiteNext;

    return {
        game: state.game.game,
        isNextPlayer: isNextPlayer,
        squares: state.game.squares,
        selectedSquareIndex: state.game.selectedSquareIndex,
        isWatingForPlayer: state.game.isWatingForPlayer,
    }
}

export default connect(mapStateToProps)(Board)