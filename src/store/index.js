import { createStore } from 'redux'
import engine from '../js/game-engine'

const INITIAL_STATE = {
    squares: engine.initializeBoardSquares(),
    capturedRedPieces: 0,
    capturedYellowPieces: 0,
    selectedSquareIndex: null,
}

function reducer(state = INITIAL_STATE, action) {
    if (action.type === 'CLICK_SQUARE') {
        let newState = engine.calculateGame(state, action.index);
        return { ...state, squares: newState.squares, selectedSquareIndex: newState.selectedSquareIndex }
    }

    return state;
}

const store = createStore(reducer);

export default store;