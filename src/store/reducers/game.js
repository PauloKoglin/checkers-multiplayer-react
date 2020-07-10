import engine from '../../js/game-engine'
import * as actionTypes from '../actions/actionTypes'
import * as types from '../../js/types'

const newPlayer = (pieceColor) => {
    return {
        name: null,
        pieceColor: pieceColor
    }
}

const INITIAL_STATE = {
    waiting: false,
    squares: engine.initializeBoardSquares(),
    capturedRedPieces: 0,
    capturedYellowPieces: 0,
    selectedSquareIndex: null,
    player1: newPlayer(types.RED_PIECE),
    player2: newPlayer(types.YELLOW_PIECE),
    isWhiteNext: true,
}

export default function reducer(state = INITIAL_STATE, action) {
    if (action.type === actionTypes.SET_PLAYER1_NAME) {
        let player = state.player1
        player.name = action.name
        return { ...state, player1: player }
    }

    if (action.type === actionTypes.SET_PLAYER2_NAME) {
        let player = state.player2
        player.name = action.name
        return { ...state, player2: player }
    }

    if (action.type === actionTypes.CALCULATE_MOVES) {
        let newState = engine.calculateGame(state, action.index);

        return {
            ...state,
            squares: newState.squares,
            selectedSquareIndex: newState.selectedSquareIndex,
            capturedRedPieces: newState.capturedRedPieces,
            capturedYellowPieces: newState.capturedYellowPieces,
        }
    }

    state.waiting = !state.player1.name || !state.player2.name;

    return state;
}
