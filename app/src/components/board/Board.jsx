import './Board.css'
import React, { Component } from 'react'
import Square from '../square/Square'

// Consts
const RED_PIECE = 'red';
const YELLOW_PIECE = 'yellow';
const initialState = {
    squares: initializeBoardSquares(),
    selectedSquareIndex: null,
}

// Variables
let possibleMoves = []

function initializeBoardSquares() {
    let squares = new Array(100).fill({ color: null, index: null, checker: null, move: null, piece: null, selected: false })
    let line = 0
    let index = 0
    let piece = ""

    squares = squares.map((square, i) => {
        if (index === 10) {
            line++
            index = 0
        }
        index++;

        piece = ""
        if (line < 3) piece = RED_PIECE
        if (line > 6) piece = YELLOW_PIECE

        if (line % 2 === 0) {
            square = i % 2 === 0 ? { ...square, color: "brown", index: i, piece } : { ...square, color: "darkyellow", index: i }
        } else
            square = i % 2 === 0 ? { ...square, color: "darkyellow", index: i } : { ...square, color: "brown", index: i, piece }

        return square
    })

    return squares
}

class Board extends Component {

    constructor(props) {
        super(props)

        this.state = {
            ...initialState
        }
    }

    squareHasPiece(i) {
        return this.state.squares[i].piece
    }

    moveSquarePiece(square, index) {
        let squares = this.state.squares

        squares[square.index].selected = false
        squares[index].piece = square.piece
        squares[square.index].piece = ""
        this.setState({ squares, selectedSquareIndex: null })
    }

    calculatePossiblesMoves(square) {
        if (square.piece === RED_PIECE)
            return [square.index + 10]
        else
            return [square.index - 10]
    }

    canMoveTo(i) {
        return possibleMoves.includes(i)
    }

    setSelectedSquare(index, value) {
        let squares = this.state.squares
        let square = squares[index]
        let newSelectedIndex

        square.selected = value
        newSelectedIndex = square.selected ? index : null
        possibleMoves = square.selected ? this.calculatePossiblesMoves(square) : []

        squares[index] = square
        this.setState({ squares, selectedSquareIndex: newSelectedIndex })
    }

    onClickSquare(i) {
        console.log("square " + i + " clicked")

        if (this.squareHasPiece(i)) {
            if (this.state.selectedSquareIndex === i) {
                this.setSelectedSquare(i, false)
                return
            }

            if (!this.state.selectedSquareIndex) {
                this.setSelectedSquare(i, true)
                return
            }
        } else {
            let selectedIndex = this.state.selectedSquareIndex
            if (selectedIndex && selectedIndex !== i && this.canMoveTo(i)) {
                this.moveSquarePiece(this.state.squares[selectedIndex], i)
            }
        }
    }

    onMouseOver(i) {
        if (possibleMoves.includes(i)) {
            let squares = this.state.squares
            squares[i].move = true
            this.setState({ squares })
        }
    }

    onMouseLeave(i) {
        let squares = this.state.squares
        if (squares[i].move) squares[i].move = false
        this.setState({ squares })
    }

    renderSquares() {
        return this.state.squares.map((square, i) => {
            return (
                <Square
                    onClick={() => this.onClickSquare(i)}
                    onMouseOver={() => this.onMouseOver(i)}
                    onMouseLeave={() => this.onMouseLeave(i)}
                    key={i}
                    config={square}>
                </Square>
            )
        })
    }

    render() {
        return (<div className='board'>
            {this.renderSquares()}
        </div>)
    }

}


export default Board


