import React from 'react'
import { connect } from 'react-redux'

import './index.css'
import Square from '../Square'
import * as actions from '../../store/actions/board'

function renderSquares(props) {
    return props.squares.map((square, index) => {
        return (
            <Square
                onClick={() => props.onSquareClick(index)}
                key={index}
                config={square}>
            </Square>
        )
    })
}

const Board = (props) => {
    return (<div className='board'>
        {renderSquares(props)}
    </div>)
}

function mapStateToProps(state) {
    return {
        squares: state.board.squares,
        selectedSquareIndex: state.board.selectedSquareIndex,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onSquareClick: (index) => dispatch(actions.calculateMoves(index)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)