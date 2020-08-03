import * as actionTypes from './actionTypes'

export const startGame = (game) => {
    return {
        type: actionTypes.START_GAME,
        game
    }
}

export const createGame = (game) => {
    return {
        type: actionTypes.CREATE_GAME,
        game
    }
}

export const playerDisconnect = (player) => {
    return {
        type: actionTypes.PLAYER_DISCONNECT,
        player
    }
}

export const playerreconnect = () => {
    return {
        type: actionTypes.PLAYER_RECONNECT,
    }
}


export const squareClick = (square) => {
    return {
        type: actionTypes.SQUARE_CLICK,
        square
    }
}

export const movePieceTo = (index) => {
    return {
        type: actionTypes.MOVE_PIECE_TO,
        index,
    }
}


