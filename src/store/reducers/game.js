import engine from '../../js/game-engine'
import * as actionTypes from '../actions/actionTypes'
import * as types from '../../js/types'

const newPlayer = (pieceColor) => {
    return {
        name: 'Player',
        pieceColor: pieceColor
    }
}

const INITIAL_STATE = {
    waiting: true,
    squares: engine.initializeBoardSquares(),
    capturedRedPieces: 0,
    capturedYellowPieces: 0,
    selectedSquareIndex: null,
    player1: newPlayer(types.RED_PIECE),
    player2: newPlayer(types.YELLOW_PIECE),
    isWhiteNext: true,
}

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.SET_PLAYER1_NAME:
            const player1 = state.player1;
            player1.name = action.name;
            return {
                ...state,
                player1
            };

        case actionTypes.SET_PLAYER2_NAME:
            const player2 = state.player2;
            player2.name = action.name;
            return {
                ...state,
                player2
            };

        case actionTypes.MOVE_PIECE_TO:
            let squares = state.squares;
            let capturedRedPieces = state.capturedRedPieces;
            let capturedYellowPieces = state.capturedYellowPieces;
            let selectedPiece = squares[state.selectedSquareIndex].piece;
            let selectedSquareIndex = state.selectedSquareIndex;
            let isWhiteNext = state.isWhiteNext;

            let move = selectedPiece.possibleMoves[0];
            if (move.hasMultipleJumps()) {
                if (move.jumpSequence[0] && move.jumpSequence[0].toIndex === action.index) {
                    // moving the place of the piece        
                    squares[action.index].piece = squares[selectedSquareIndex].piece;
                    squares[action.index].isMovable = false;
                    squares[action.index].isSelected = true;

                    // changing the old position
                    squares[selectedSquareIndex].isSelected = false;
                    squares[selectedSquareIndex].piece = {};

                    // seting the captured piece
                    if (move.jumpSequence[0].isCaptureJump()) {
                        squares[move.jumpSequence[0].captureIndex].piece = {};
                        isWhiteNext ? capturedRedPieces++ : capturedYellowPieces++;
                    }

                    move.jumpSequence.shift();
                    selectedSquareIndex = action.index;
                }
            } else {
                // moving the place of the piece        
                squares[action.index].piece = squares[selectedSquareIndex].piece;
                squares[selectedSquareIndex].isSelected = false;
                squares[selectedSquareIndex].piece = {};
                selectedSquareIndex = null;

                // seting the captured piece
                if (move.jumpSequence[0].isCaptureJump()) {
                    squares[move.jumpSequence[0].captureIndex].piece = {};
                    state.isWhiteNext ? capturedRedPieces++ : capturedYellowPieces++;
                }

                // verify if the piece become a checker at new position 
                if (!squares[action.index].piece.isChecker)
                    squares[action.index].piece.isChecker = engine.isCheckerPosition(squares[action.index].piece, action.index);

                // set all the squares to default
                squares.forEach(square => {
                    square.isPossibleMove = false
                    square.piece.isMovable = false
                    square.piece.possibleMoves = []

                });

                // calculate the next possible moves for the player                
                squares.join(engine.calculateMoves(isWhiteNext ? types.RED_PIECE : types.YELLOW_PIECE, squares));
                isWhiteNext = !isWhiteNext;
            }

            return {
                ...state,
                isWhiteNext,
                capturedRedPieces,
                capturedYellowPieces,
                selectedSquareIndex,
                squares,
            }

        case actionTypes.SQUARE_CLICK:
            let clickedSquare = action.square;
            console.log(action, clickedSquare)
            if (!clickedSquare.isSelected) {
                state.squares[clickedSquare.index].isSelected = true;
                state.selectedSquareIndex = clickedSquare.index;
                state.squares = engine.setSquaresToPossibleMove(state.squares, clickedSquare.piece.possibleMoves, true);
            } else {
                state.squares[clickedSquare.index].isSelected = false;
                state.selectedSquareIndex = null;
                state.squares = engine.setSquaresToPossibleMove(state.squares, clickedSquare.piece.possibleMoves, false);
            }

            return { ...state }

        case actionTypes.START_GAME:
            let newState = engine.calculateGame(state, action.index);

            return {
                ...state,
                isWhiteNext: true,
                squares: newState.squares,
            }

        default:
            if (state.waiting) {
                state.waiting = !state.player1.name || !state.player2.name;
                let moves = engine.calculateMoves(types.YELLOW_PIECE, state.squares);
                state.squares.join(moves);

                return {
                    ...state,
                    isWhiteNext: true,
                }
            }

            return state;
    }
}
