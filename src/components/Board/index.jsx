import React from 'react'
import { connect } from 'react-redux'
import ReactModal from "react-modal";
import { PulseLoader } from "react-spinners";

import './styles.css'
import types from '../../types'

import Square from '../Square'
import axios from "../../services";
import socket from '../../webSocket'

function Board(props) {

    ReactModal.setAppElement('#root');

    const modalStyles = {
        overlay: {
            backgroundColor: 'transparent',
            top: '50%',
            left: '50%',
            bottom: '25%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            heigth: '400px',
        },
        content: {
            position: 'absolute',
            backgroundColor: '#4E5283',
            border: '0'
        }
    }

    function handleClick(props, square, index) {
        if (props.isWatingForPlayer || props.isNextPlayer)
            return;

        if (!props.selectedSquareIndex || square.isSelected) {
            if (square.piece.isMovable)
                return socket.emit('select_square', {
                    room: props.game.room,
                    clickedSquare: square
                });
        }

        if (square.isPossibleMove) {
            return socket.emit('move_piece_to', {
                room: props.game.room,
                selectedIndex: props.selectedSquareIndex,
                index
            });
        }

        return null;
    };

    function handleEndGameClick() {
        axios.delete('rooms/' + props.game.room)
            .then(() => {
                console.log('call reducer');
            });
    };

    return (
        <div>
            <ReactModal
                id='waiting-for-player-modal'
                isOpen={props.isWatingForPlayer}
                style={modalStyles}
                closeTimeoutMS={5000}
            >
                <PulseLoader
                    size={10}
                    color={'#6CF'}
                    loading={true}
                />
                <p>Second player disconnected...</p>
                <button
                    onClick={() => handleEndGameClick()}
                >End Game</button>
            </ReactModal>

            <div
                id='game-board-container'
                className={props.isWatingForPlayer ? 'disabled' : ''}
            >
                {
                    props.squares.map((square, index) => {
                        return (
                            <Square
                                key={index}
                                {...square}
                                onClick={() => handleClick(props, square, index)}>
                            </Square>
                        )
                    })
                }
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