import React from 'react'
import { connect } from 'react-redux'

import './styles.css'
import Square from '../Square'
import * as types from '../../js/types/index'
import * as actions from '../../store/actions/game'
import socket from '../../webSocket'

const onClick = (props, square, index) => {
    if (props.isNextPlayer) {
        if (!props.selectedSquareIndex || square.isSelected) {
            if (square.piece.isMovable)
                return socket.emit('select_square', props.game.room, square);
        }

        if (square.isPossibleMove)
            return socket.emit('move_piece_to', props.game.room, index);
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

const Board = (props) => {
    return (<div className={'board'.concat(props.waiting ? ' disabled' : '')}>
        {renderSquares(props)}
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
        waiting: false,  // TODO; Retirar a negacao
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onSquareClick: (square) => dispatch(actions.squareClick(square)),
        movePieceTo: (index) => dispatch(actions.movePieceTo(index)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)