import * as actionTypes from '../actions/actionTypes'
import * as types from '../../js/types'

const newPlayer = (pieceColor) => {
    return {
        name: null,
        pieceColor: pieceColor
    }
}

const INITIAL_STATE = {
    player1: newPlayer(types.RED_PIECE),
    player2: newPlayer(types.YELLOW_PIECE)
}

export default function reducer(state = INITIAL_STATE, action) {
    // console.log(state, action)
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

    return state;
}
