import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
    player: null,
    game: null,

    squares: null,
    capturedRedPieces: 0,
    capturedYellowPieces: 0,
    selectedSquareIndex: null,
    joinGameURL: '',

    isWhiteNext: true,
    isLoading: false,
    isGameStarted: false,
    isWatingForPlayer: false
}

function startGame(state, action) {
    const { game, squares } = action.payload;
    const player2 = state.player ? state.player : game.secondPlayer;

    return {
        game,
        squares,
        player: player2,
        isGameStarted: true,
        isWatingForPlayer: false,
    }
}

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.CREATE_GAME:
            const player1 = action.game.firstPlayer;

            return {
                ...state,
                game: action.game,
                player: {
                    playerName: player1.name,
                    pieceColor: player1.pieceColor
                },
                joinGameURL: window.location.href.concat('?' + action.game.room),
                isWatingForPlayer: true,
                isLoading: false,
            };

        case actionTypes.START_GAME:
            const stateUpdates = startGame(state, action);

            return {
                ...state,
                ...stateUpdates
            };

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
            return {
                ...state,
                ...action.payload
            }

        case actionTypes.SQUARE_CLICK:
            return {
                ...state,
                ...action.payload
            }

        case actionTypes.END_GAME:
            const player = state.player;
            return {
                ...INITIAL_STATE,
                player
            }

        default:
            return {
                ...state,
            }
    }
}
