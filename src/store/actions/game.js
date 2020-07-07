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

export const incPlayerCapturedPieces = (pieceColor) => {
    return {
        type: actionTypes.INC_PLAYER_CAPTURED_PIECES,
        pieceColor
    }
}