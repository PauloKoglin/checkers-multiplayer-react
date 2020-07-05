import './Board.css'
import React, { Component } from 'react'
import Square from '../square/Square'

// Consts
const RED_PIECE = 'red';
const YELLOW_PIECE = 'yellow';
const YELLOW_CHECKER_POSITIONS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const RED_CHECKER_POSITIONS = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
const NOT_CAPTURABLE_PIECES_INDEX = [0, 9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79, 80, 89, 90, 99]
const LEFT_SQUARE_INDEX = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
const RIGHT_SQUARE_INDEX = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99]
const CHECK_INDEX_RIGHT_FORWARD = 9;
const CHECK_INDEX_RIGTH_BACKWARD = -9;
const CHECK_INDEX_LEFT_FORWARD = 11;
const CHECK_INDEX_LEFT_BACKWARD = -11;


const INITIAL_STATE = {
    squares: initializeBoardSquares(),
    capturedRedPieces: 0,
    capturedYellowPieces: 0,
    selectedSquareIndex: null,
}

// Variables
let possibleMoves = []
let possibleCaptures = []

function initializeBoardSquares() {
    let squares = new Array(100).fill(
        {
            color: null,
            index: null,
            checker: null,
            move: null,
            piece: null,
            selected: false,
        }
    )
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
            ...INITIAL_STATE
        }
    }

    // Arrow Functions
    squareHasPiece = (i) => this.state.squares[i].piece
    canMoveTo = (i) => possibleMoves.includes(i) || possibleCaptures.find(item => item.CapturerNewIndex === i)
    isCheckerPosition = (piece, position) => piece === RED_PIECE ? RED_CHECKER_POSITIONS.includes(position) : YELLOW_CHECKER_POSITIONS.includes(position)

    moveSquarePiece(square, newPosition) {
        let squares = this.state.squares
        let selectedSquareIndex = null


        if (possibleCaptures.length > 0) {
            possibleCaptures.forEach(item => {
                if (item.CapturerNewIndex === newPosition) {
                    squares[item.PieceToCaptureIndex].piece === RED_PIECE ?
                        this.props.incCapturedRedPieces() : this.props.incCapturedYellowPieces()
                    squares[item.PieceToCaptureIndex].piece = null
                }
            })
            possibleCaptures = this.calculatePossibleCaptures(square.piece, newPosition)
        }
        this.paintPossibleMoves(squares)

        squares.forEach(square => {
            square.move = false
        })

        squares[newPosition].piece = square.piece
        squares[newPosition].checker = square.checker
        squares[newPosition].move = false
        squares[square.index].selected = false
        squares[square.index].piece = null
        squares[square.index].checker = false

        if (possibleCaptures.length > 0) {
            selectedSquareIndex = newPosition
            squares[newPosition].selected = true
        }

        if (this.isCheckerPosition(squares[newPosition].piece, newPosition))
            squares[newPosition].checker = true

        this.setState({ squares, selectedSquareIndex: selectedSquareIndex })
    }

    tranformChecker(square) {
        let squares = this.state.squares
        squares[square.index].checker = true
        this.setState({ ...this.state, squares })
    }


    returnPositionsToCapture(piece, position, checkIndex) {
        let checkPosition = position + checkIndex
        let afterCapturePosition = checkPosition + checkIndex
        let squareToCapture = this.state.squares[checkPosition]

        if (afterCapturePosition < 0 || afterCapturePosition > 99 || NOT_CAPTURABLE_PIECES_INDEX.includes(checkPosition)) return

        if (squareToCapture && squareToCapture.piece && squareToCapture.piece !== piece && !this.state.squares[afterCapturePosition].piece)
            return { PieceToCaptureIndex: squareToCapture.index, CapturerNewIndex: afterCapturePosition }
    }

    // Recursive method
    calculateCheckerDiagonal(position, checkIndex, moves) {
        let checkPosition = position + checkIndex
        let squareAtPosition = this.state.squares[checkPosition]

        if (squareAtPosition && !squareAtPosition.piece) {
            moves = [...moves, checkPosition]
            if (!LEFT_SQUARE_INDEX.includes(checkPosition) && !RIGHT_SQUARE_INDEX.includes(checkPosition)) {
                return this.calculateCheckerDiagonal(squareAtPosition.index, checkIndex, moves)
            }

        }
        return moves
    }

    calculateCheckerMoves(square) {
        let moves = []

        if (!LEFT_SQUARE_INDEX.includes(square.index))
            moves = this.calculateCheckerDiagonal(square.index, CHECK_INDEX_RIGHT_FORWARD, moves)

        if (!RIGHT_SQUARE_INDEX.includes(square.index))
            moves = this.calculateCheckerDiagonal(square.index, CHECK_INDEX_RIGTH_BACKWARD, moves)

        if (!RIGHT_SQUARE_INDEX.includes(square.index))
            moves = this.calculateCheckerDiagonal(square.index, CHECK_INDEX_LEFT_FORWARD, moves)

        if (!LEFT_SQUARE_INDEX.includes(square.index))
            moves = this.calculateCheckerDiagonal(square.index, CHECK_INDEX_LEFT_BACKWARD, moves)

        return moves
    }

    calculatePossiblesMoves(square) {

        if (square.checker)
            return this.calculateCheckerMoves(square)

        if (RIGHT_SQUARE_INDEX.includes(square.index))
            return square.piece === RED_PIECE ? [square.index + CHECK_INDEX_RIGHT_FORWARD] : [square.index + CHECK_INDEX_LEFT_BACKWARD]

        if (LEFT_SQUARE_INDEX.includes(square.index))
            return square.piece === RED_PIECE ? [square.index + CHECK_INDEX_LEFT_FORWARD] : [square.index + CHECK_INDEX_RIGTH_BACKWARD]

        return square.piece === RED_PIECE ? [square.index + 9, square.index + 11] : [square.index - 9, square.index - 11]
    }

    calculatePossibleCaptures(piece, position) {
        let checkedPosition;
        let captures = []

        if (checkedPosition = this.returnPositionsToCapture(piece, position, CHECK_INDEX_RIGHT_FORWARD))
            captures.push(checkedPosition)

        if (checkedPosition = this.returnPositionsToCapture(piece, position, CHECK_INDEX_RIGTH_BACKWARD))
            captures.push(checkedPosition)

        if (checkedPosition = this.returnPositionsToCapture(piece, position, CHECK_INDEX_LEFT_FORWARD))
            captures.push(checkedPosition)

        if (checkedPosition = this.returnPositionsToCapture(piece, position, CHECK_INDEX_LEFT_BACKWARD))
            captures.push(checkedPosition)

        return captures
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
        // console.log("square " + i + " clicked")

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

    renderSquares() {
        return this.state.squares.map((square, i) => {
            return (
                <Square
                    onClick={() => this.onClickSquare(i)}
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


