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
let possibleCaptures = []

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
        let selectedSquareIndex = null

        if (possibleCaptures.length > 0) {
            possibleCaptures.forEach(item => {
                if (item.CapturerNewIndex === index)
                    squares[item.PieceToCaptureIndex].piece = null
            })
            possibleCaptures = this.calculatePossibleCaptures(square.piece, index)
        }
        this.paintPossibleMoves(squares)

        squares[square.index].selected = false
        squares[index].piece = square.piece
        squares[index].move = false
        squares[square.index].piece = null

        if (possibleCaptures.length > 0) {
            selectedSquareIndex = index
            squares[index].selected = true
        }

        this.setState({ squares, selectedSquareIndex: selectedSquareIndex })
    }

    calculatePossibleCaptures(piece, position) {
        let square = null
        let captures = []
        let checkPosition = null

        checkPosition = position + 9
        square = this.state.squares[checkPosition]
        if (square.piece && square.piece !== piece)
            captures.push({ PieceToCaptureIndex: square.index, CapturerNewIndex: checkPosition + 9 })

        checkPosition = position - 9
        square = this.state.squares[checkPosition]
        if (square.piece && square.piece !== piece)
            captures.push({ PieceToCaptureIndex: square.index, CapturerNewIndex: checkPosition - 9 })

        checkPosition = position + 11
        square = this.state.squares[checkPosition]
        if (square.piece && square.piece !== piece)
            captures.push({ PieceToCaptureIndex: square.index, CapturerNewIndex: checkPosition + 11 })

        checkPosition = position - 11
        square = this.state.squares[checkPosition]
        if (square.piece && square.piece !== piece)
            captures.push({ PieceToCaptureIndex: square.index, CapturerNewIndex: checkPosition - 11 })

        return captures
    }

    calculatePossiblesMoves(square) {
        if (square.piece === RED_PIECE) {
            return [square.index + 10]
        } else {
            return [square.index - 10]
        }
    }

    canMoveTo(i) {
        return possibleMoves.includes(i) || possibleCaptures.find(item => item.CapturerNewIndex === i)
    }

    paintPossibleMoves(squares) {
        if (possibleCaptures.length > 0) {
            squares.forEach(square => {
                if (possibleCaptures.find(item => item.CapturerNewIndex === square.index))
                    square.move = true
            })
        } else {
            squares.forEach(square => {
                if (possibleMoves.includes(square.index))
                    square.move = true
            })
        }
    }

    setSelectedSquare(index, value) {
        let squares = this.state.squares
        let square = squares[index]
        let newSelectedIndex

        square.selected = value
        newSelectedIndex = square.selected ? index : null
        possibleCaptures = square.selected ? this.calculatePossibleCaptures(square.piece, index) : []
        possibleMoves = square.selected && possibleCaptures.length === 0 ? this.calculatePossiblesMoves(square) : []

        squares[index] = square

        if (!square.selected) {
            squares.forEach(square => {
                square.move = false
            })
        }
        this.paintPossibleMoves(squares)

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
        // if (possibleMoves.includes(i) || possibleCaptures.find(item => item.CapturerNewIndex === i)) {
        //     let squares = this.state.squares
        //     squares[i].move = true
        //     this.setState({ squares })
        // }
        console.log("mouse over")
    }

    onMouseLeave(i) {
        // let squares = this.state.squares
        // if (squares[i].move) squares[i].move = false
        // this.setState({ squares })
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


