import React from 'react'
import { connect } from 'react-redux'

import './index.css'
import Square from '../Square'
import * as actions from '../../store/actions/game'

function renderSquares(props) {
    return props.squares.map((square, index) => {
        return (
            <Square
                onClick={() => props.waiting ? null : props.onSquareClick(index)}
                key={index}
                config={square}>
            </Square>
        )
    })
}

const Board = (props) => {
    return (<div className={'board'.concat(props.waiting ? ' disabled' : '')}>
        {renderSquares(props)}
    </div>)
}

function mapStateToProps(state) {
    return {
        squares: state.game.squares,
        selectedSquareIndex: state.game.selectedSquareIndex,
        waiting: !state.game.waiting,  // TODO; Retirar a negacao
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onSquareClick: (index) => dispatch(actions.calculateMoves(index)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)