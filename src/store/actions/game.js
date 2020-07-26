import * as actionTypes from './actionTypes'

export const setPlayer1Name = (name) => {
    return {
        type: actionTypes.SET_PLAYER1_NAME,
        name
    }
}

export const setPlayer2Name = (name) => {
    return {
        type: actionTypes.SET_PLAYER2_NAME,
        name
    }
}

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


