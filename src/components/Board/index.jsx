import React from 'react'
import { connect } from 'react-redux'

import './styles.css'
import Square from '../Square'
import * as actions from '../../store/actions/game'

function renderSquares(props) {
    return props.squares.map((square, index) => {
        return (
            <Square
                onClick={() => {
                    if (!props.selectedSquareIndex || square.isSelected) {
                        if (square.piece.isMovable)
                            return props.onSquareClick(square)
                    }

                    if (square.isPossibleMove)
                        return props.movePieceTo(index)

                    return null
                }
                }
                key={index}
                {...square}>
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
        waiting: state.game.waiting,  // TODO; Retirar a negacao
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onSquareClick: (square) => dispatch(actions.squareClick(square)),
        movePieceTo: (index) => dispatch(actions.movePieceTo(index)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)