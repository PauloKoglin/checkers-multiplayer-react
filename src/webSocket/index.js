// import { useStore } from 'react-redux'
import io from 'socket.io-client'
import store from '../store';
import * as actions from '../store/actions/game';

const socket = io('http://localhost:3001', {
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
