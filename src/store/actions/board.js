import * as actionTypes from './actionTypes'

export const calculateMoves = (index) => {
    return {
        type: actionTypes.CALCULATE_MOVES,
        index
    }
}