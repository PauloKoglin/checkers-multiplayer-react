import * as types from '../types'

const YELLOW_CHECKER_POSITIONS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const RED_CHECKER_POSITIONS = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99]
const NOT_CAPTURABLE_PIECES_INDEX = [0, 9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 69, 70, 79, 80, 89, 90, 99]
const LEFT_SQUARE_INDEX = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]
const RIGHT_SQUARE_INDEX = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99]
const CHECK_INDEX_RIGHT_FORWARD = 9;
const CHECK_INDEX_RIGTH_BACKWARD = -9;
const CHECK_INDEX_LEFT_FORWARD = 11;
const CHECK_INDEX_LEFT_BACKWARD = -11;

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
        if (line < 3) piece = types.RED_PIECE
        if (line > 6) piece = types.YELLOW_PIECE

        if (line % 2 === 0) {
            square = i % 2 === 0 ? { ...square, color: "brown", index: i, piece } : { ...square, color: "darkyellow", index: i }
        } else
            square = i % 2 === 0 ? { ...square, color: "darkyellow", index: i } : { ...square, color: "brown", index: i, piece }

        return square
    })

    return squares
}

const squareHasPiece = (squares, index) => squares[index].piece
const canMoveTo = (index) => possibleMoves.includes(index) || possibleCaptures.find(item => item.CapturerNewIndex === index)
const isCheckerPosition = (piece, position) => piece === types.RED_PIECE ? RED_CHECKER_POSITIONS.includes(position) : YELLOW_CHECKER_POSITIONS.includes(position)

function moveSquarePiece(state, square, newPosition) {
    let squares = state.squares
    let selectedSquareIndex = null
    let capturedRedPieces = state.capturedRedPieces || 0
    let capturedYellowPieces = state.capturedYellowPieces || 0

    if (possibleCaptures.length > 0) {
        possibleCaptures.forEach(item => {
            if (item.CapturerNewIndex === newPosition) {
                squares[item.PieceToCaptureIndex].piece === types.RED_PIECE ? capturedRedPieces++ : capturedYellowPieces++
                squares[item.PieceToCaptureIndex].piece = null
            }
        })
        possibleCaptures = calculatePossibleCaptures(state, square.piece, newPosition)
    }
    paintPossibleMoves(squares)

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

    if (isCheckerPosition(squares[newPosition].piece, newPosition))
        squares[newPosition].checker = true

    return { ...state, squares, selectedSquareIndex: selectedSquareIndex, capturedRedPieces, capturedYellowPieces }
}

// function tranformChecker(state, square) {
//     let squares = state.squares
//     squares[square.index].checker = true
//     setState({ ...this.state, squares })
// }


function returnPositionsToCapture(state, piece, position, checkIndex) {
    let checkPosition = position + checkIndex
    let afterCapturePosition = checkPosition + checkIndex
    let squareToCapture = state.squares[checkPosition]

    if (afterCapturePosition < 0 || afterCapturePosition > 99 || NOT_CAPTURABLE_PIECES_INDEX.includes(checkPosition)) return

    if (squareToCapture && squareToCapture.piece && squareToCapture.piece !== piece && !state.squares[afterCapturePosition].piece)
        return { PieceToCaptureIndex: squareToCapture.index, CapturerNewIndex: afterCapturePosition }
}

// Recursive method
function calculateCheckerDiagonal(state, position, checkIndex, moves) {
    let checkPosition = position + checkIndex
    let squareAtPosition = state.squares[checkPosition]

    if (squareAtPosition && !squareAtPosition.piece) {
        moves = [...moves, checkPosition]
        if (!LEFT_SQUARE_INDEX.includes(checkPosition) && !RIGHT_SQUARE_INDEX.includes(checkPosition)) {
            return calculateCheckerDiagonal(state, squareAtPosition.index, checkIndex, moves)
        }

    }
    return moves
}

function calculateCheckerMoves(state, square) {
    let moves = []

    if (!LEFT_SQUARE_INDEX.includes(square.index))
        moves = calculateCheckerDiagonal(state, square.index, CHECK_INDEX_RIGHT_FORWARD, moves)

    if (!RIGHT_SQUARE_INDEX.includes(square.index))
        moves = calculateCheckerDiagonal(state, square.index, CHECK_INDEX_RIGTH_BACKWARD, moves)

    if (!RIGHT_SQUARE_INDEX.includes(square.index))
        moves = calculateCheckerDiagonal(state, square.index, CHECK_INDEX_LEFT_FORWARD, moves)

    if (!LEFT_SQUARE_INDEX.includes(square.index))
        moves = calculateCheckerDiagonal(state, square.index, CHECK_INDEX_LEFT_BACKWARD, moves)

    return moves
}

function calculatePossiblesMoves(state, square) {

    if (square.checker)
        return calculateCheckerMoves(state, square)

    if (RIGHT_SQUARE_INDEX.includes(square.index))
        return square.piece === types.RED_PIECE ? [square.index + CHECK_INDEX_RIGHT_FORWARD] : [square.index + CHECK_INDEX_LEFT_BACKWARD]

    if (LEFT_SQUARE_INDEX.includes(square.index))
        return square.piece === types.RED_PIECE ? [square.index + CHECK_INDEX_LEFT_FORWARD] : [square.index + CHECK_INDEX_RIGTH_BACKWARD]

    return square.piece === types.RED_PIECE ? [square.index + 9, square.index + 11] : [square.index - 9, square.index - 11]
}

function calculatePossibleCaptures(state, piece, position) {
    let checkedPosition;
    let captures = []

    if (checkedPosition = returnPositionsToCapture(state, piece, position, CHECK_INDEX_RIGHT_FORWARD))
        captures.push(checkedPosition)

    if (checkedPosition = returnPositionsToCapture(state, piece, position, CHECK_INDEX_RIGTH_BACKWARD))
        captures.push(checkedPosition)

    if (checkedPosition = returnPositionsToCapture(state, piece, position, CHECK_INDEX_LEFT_FORWARD))
        captures.push(checkedPosition)

    if (checkedPosition = returnPositionsToCapture(state, piece, position, CHECK_INDEX_LEFT_BACKWARD))
        captures.push(checkedPosition)

    return captures
}

function paintPossibleMoves(squares) {
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
    return squares
}

function setSelectedSquare(state, index, value) {
    let squares = state.squares
    let square = squares[index]
    let newSelectedIndex

    square.selected = value
    newSelectedIndex = square.selected ? index : null
    possibleCaptures = square.selected ? calculatePossibleCaptures(state, square.piece, index) : []
    possibleMoves = square.selected && possibleCaptures.length === 0 ? calculatePossiblesMoves(state, square) : []

    squares[index] = square

    if (!square.selected) {
        squares.forEach(square => {
            square.move = false
        })
    }
    squares = paintPossibleMoves(squares)

    return { ...state, squares, selectedSquareIndex: newSelectedIndex }
}

function calculateGame(state, index) {

    if (squareHasPiece(state.squares, index)) {
        if (state.selectedSquareIndex === index) {
            return setSelectedSquare(state, index, false)
        }

        if (!state.selectedSquareIndex) {
            return setSelectedSquare(state, index, true)
        }
    } else {
        let selectedIndex = state.selectedSquareIndex
        if (selectedIndex && selectedIndex !== index && canMoveTo(index)) {
            return moveSquarePiece(state, state.squares[selectedIndex], index)
        }
    }
    return { ...state }
}

export default { initializeBoardSquares, calculateGame };
