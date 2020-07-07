import { combineReducers } from 'redux'

import board from './board'
import game from './game'

export default combineReducers({
    board,
    game,
})