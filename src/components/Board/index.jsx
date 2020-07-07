import React from 'react'
import { connect } from 'react-redux'

import './index.css'
import Square from '../Square'

function onClick(index) {
    return {
        type: 'CLICK_SQUARE',
        index
    }
}

function renderSquares(squares, dispatch) {
    return squares.map((square, index) => {
        return (
            <Square
                onClick={() => dispatch(onClick(index))}
                key={index}
                config={square}>
            </Square>
        )
    })
}

const Board = ({ squares, dispatch, selectedSquareIndex }) => {
    return (<div className='board'>
        {renderSquares(squares, dispatch)}
    </div>)
}

export default connect(state => ({ squares: state.squares, selectedSquareIndex: state.selectedSquareIndex }))(Board)


