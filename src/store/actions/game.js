import * as actionTypes from './actionTypes'

export const startGame = (payload) => {
    return {
        type: actionTypes.START_GAME,
        payload
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

export const squareClick = (payload) => {
    return {
        type: actionTypes.SQUARE_CLICK,
        payload
    }
}

export const movePieceTo = (payload) => {
    return {
        type: actionTypes.MOVE_PIECE_TO,
        payload,
    }
}

export const endGame = () => {
    return {
        type: actionTypes.END_GAME,
    }
}