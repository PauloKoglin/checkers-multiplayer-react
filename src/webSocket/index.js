import io from 'socket.io-client'
import store from '../store';
import * as actions from '../store/actions/game';
import config from '../config/config.js'

const socket = io(config.server_URL, {
    autoConnect: false
});

socket.on('start_game', (game) => {
    console.log('The game will start!');
    console.log(game);

    store.dispatch(actions.startGame(game));
});

socket.on('move_piece_to', (index) => {
    console.log('move piece to ' + index);
    store.dispatch(actions.movePieceTo(index));
});

socket.on('select_square', (square) => {
    console.log('square selected ' + square.index);
    store.dispatch(actions.squareClick(square));
});

export default socket;
