import engine from '../../js/game-engine';
import * as actionTypes from '../actions/actionTypes';
import types from '../../js/types';

const INITIAL_STATE = {
    player: null,
    game: null,

    squares: engine.initializeBoardSquares(),
    capturedRedPieces: 0,
    capturedYellowPieces: 0,
    selectedSquareIndex: null,
    gameURL: '',

    isWhiteNext: true,
    isLoading: false,
    isGameStarting: false,
    isWatingForPlayer: false
}

export default function reducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case actionTypes.CREATE_GAME:
            const player1 = action.game.firstPlayer;

            sessionStorage.setItem('player_name', player1.name);
            sessionStorage.setItem('last_room', action.game.room);

            return {
                ...state,
                game: action.game,
                player: {
                    playerName: player1.name,
                    pieceColor: player1.pieceColor
                },
                gameURL: window.location.href.concat('?' + action.game.room),
                isWatingForPlayer: true,
                isLoading: false,
            };

        case actionTypes.START_GAME:
            const player2 = state.player ? state.player : action.game.secondPlayer;
            const moves = engine.calculateMoves(types.YELLOW_PIECE, state.squares);
            state.squares.join(moves);

            return {
                ...state,
                player: player2,
                game: action.game,
                isGameStarting: true,
                isWatingForPlayer: false,
            }

        case actionTypes.PLAYER_DISCONNECT:
            return {
                ...state,
                isWatingForPlayer: true,
            }

        case actionTypes.PLAYER_RECONNECT:
            return {
                ...state,
                isWatingForPlayer: false,
            }

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
            // console.log(action, clickedSquare)
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

        default:
            return {
                ...state,
            }
    }
}
