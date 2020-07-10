import engine from '../../js/game-engine'
import * as actionTypes from '../actions/actionTypes'

const INITIAL_STATE = {
    squares: engine.initializeBoardSquares(),
    capturedRedPieces: 0,
    capturedYellowPieces: 0,
    selectedSquareIndex: null,
}

export default function reducer(state = INITIAL_STATE, action) {
    if (action.type === actionTypes.CALCULATE_MOVES) {
        let newState = engine.calculateGame(state, action.index);
        console.log(newState)
        return {
            ...state,
            squares: newState.squares,
            selectedSquareIndex: newState.selectedSquareIndex,
            capturedRedPieces: newState.capturedRedPieces,
            capturedYellowPieces: newState.capturedYellowPieces,
        }
    }

    return state;
}
