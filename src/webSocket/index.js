import io from 'socket.io-client'

import * as actions from '../store/actions/game';
import store from '../store';
import config from '../config/config.js'

const socket = io(config.server_URL, {
    autoConnect: false
});

socket.on('create_room', (game) => store.dispatch(actions.createGame(game)));
socket.on('start_game', (payload) => store.dispatch(actions.startGame(payload)));
socket.on('player_disconnect', (player) => store.dispatch(actions.playerDisconnect(player)));
socket.on('move_piece_to', (payload) => store.dispatch(actions.movePieceTo(payload)));
socket.on('select_square', (square) => store.dispatch(actions.squareClick(square)));

export default socket;
