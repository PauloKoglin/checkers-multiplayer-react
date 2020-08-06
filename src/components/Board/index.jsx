import React from 'react'
import { connect } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import Modal from 'react-modal'

import './styles.css'
import Square from '../Square'
import * as types from '../../js/types/index'
import * as actions from '../../store/actions/game'
import socket from '../../webSocket'

const onClick = (props, square, index) => {
    if (props.isWatingForPlayer)
        return

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
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            backgroundColor: 'transparent',
            transform: 'translate(-40%, -40%)',
            color: 'black'
        }
    };

    Modal.setAppElement('#root')
    const Loading = (
        <Modal
            isOpen={props.isWatingForPlayer}
            style={customStyles}
        >
            <div className='container-cl al-center'>
                <ClipLoader loading={props.isWatingForPlayer} color={"#8AF"} />
                <p>The second player leave the room.</p>
            </div>
        </Modal>);

    return (
        <div>
            {Loading}
            <div className={'board'.concat(props.isWatingForPlayer ? ' disabled' : '')}>
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

function mapDispatchToProps(dispatch) {
    return {
        onSquareClick: (square) => dispatch(actions.squareClick(square)),
        movePieceTo: (index) => dispatch(actions.movePieceTo(index)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)