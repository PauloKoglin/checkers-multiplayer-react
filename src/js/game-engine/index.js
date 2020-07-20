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

class Jump {
    constructor(toIndex, captureIndex) {
        this.toIndex = toIndex;
        this.captureIndex = captureIndex;
    }

    isCaptureJump = () => this.captureIndex;
}

class Move {

    constructor(toIndex) {
        this.jumpSequence = [];

        if (toIndex)
            this.jumpSequence.push(new Jump(toIndex));
    }

    addJump(jump) {
        if (jump)
            this.jumpSequence.push(jump);
    }

    hasMultipleJumps = () => this.jumpSequence.length > 1;
}

function setSquaresToPossibleMove(squares, possibleMoves, active) {
    possibleMoves.forEach(
        move => {
            move.jumpSequence.forEach(
                jump => squares[jump.toIndex].isPossibleMove = active
            );
        }
    );
    return squares;
}

function initializeBoardSquares() {
    let squares = new Array(100).fill(
        {
            color: null,
            index: null,
            isPossibleMove: false,
            isSelected: false,
            piece: {
                color: null,
                isChecker: false,
                isMovable: false,
                possibleMoves: [],
            }
        }
    )
    let line = 0
    let index = 0

    squares = squares.map((square, i) => {
        let piece = {};

        if (index === 10) {
            line++
            index = 0
        }
        index++;

        if (line < 3)
            piece = {
                color: types.RED_PIECE,
                isChecker: false,
                isMovable: false,
                possibleMoves: [],
            };

        if (line > 6)
            piece = {
                color: types.YELLOW_PIECE,
                isChecker: false,
                isMovable: false,
                possibleMoves: [],
            };

        if (line % 2 === 0) {
            square = i % 2 === 0 ? { ...square, color: "brown", index: i, piece } : { ...square, color: "darkyellow", index: i }
        } else
            square = i % 2 === 0 ? { ...square, color: "darkyellow", index: i } : { ...square, color: "brown", index: i, piece }

        return square
    })

    return squares
}

const squareHasPiece = (squares, index) => squares[index].piece.color

function isCheckerPosition(piece, position) {
    return piece.color === types.RED_PIECE ? RED_CHECKER_POSITIONS.includes(position) : YELLOW_CHECKER_POSITIONS.includes(position)
}

// Recursive method
function calculateCheckerDiagonal(squares, position, checkIndex, moves) {
    let checkPosition = position + checkIndex
    let squareAtPosition = squares[checkPosition]

    if (squareAtPosition && !squareAtPosition.piece.color) {
        moves = [...moves, new Move(checkPosition)]
        if (!LEFT_SQUARE_INDEX.includes(checkPosition) && !RIGHT_SQUARE_INDEX.includes(checkPosition)) {
            return calculateCheckerDiagonal(squares, squareAtPosition.index, checkIndex, moves)
        }
    }
    return moves
}

function calculateCheckerMoves(squares, square) {
    let moves = []

    if (!LEFT_SQUARE_INDEX.includes(square.index))
        moves = calculateCheckerDiagonal(squares, square.index, CHECK_INDEX_RIGHT_FORWARD, moves)

    if (!RIGHT_SQUARE_INDEX.includes(square.index))
        moves = calculateCheckerDiagonal(squares, square.index, CHECK_INDEX_RIGTH_BACKWARD, moves)

    if (!RIGHT_SQUARE_INDEX.includes(square.index))
        moves = calculateCheckerDiagonal(squares, square.index, CHECK_INDEX_LEFT_FORWARD, moves)

    if (!LEFT_SQUARE_INDEX.includes(square.index))
        moves = calculateCheckerDiagonal(squares, square.index, CHECK_INDEX_LEFT_BACKWARD, moves)

    return moves
}

function calculatePossiblesMoves(squares, square) {
    let moves = []

    if (square.piece.isChecker) {
        moves = calculateCheckerMoves(squares, square);
        return moves;
    }

    if (RIGHT_SQUARE_INDEX.includes(square.index)) {
        if (square.piece.color === types.RED_PIECE) {
            if (!squareHasPiece(squares, square.index + CHECK_INDEX_RIGHT_FORWARD))
                moves.push(new Move(square.index + CHECK_INDEX_RIGHT_FORWARD))
        } else {
            if (!squareHasPiece(squares, square.index + CHECK_INDEX_LEFT_BACKWARD))
                moves.push(new Move(square.index + CHECK_INDEX_LEFT_BACKWARD))
        }
        return moves;
    }

    if (LEFT_SQUARE_INDEX.includes(square.index)) {
        if (square.piece.color === types.RED_PIECE) {
            if (!squareHasPiece(squares, square.index + CHECK_INDEX_LEFT_FORWARD))
                moves.push(new Move(square.index + CHECK_INDEX_LEFT_FORWARD))
        } else {
            if (!squareHasPiece(squares, square.index + CHECK_INDEX_RIGTH_BACKWARD))
                moves.push(new Move(square.index + CHECK_INDEX_RIGTH_BACKWARD))
        }
        return moves;
    }

    if (square.piece.color === types.RED_PIECE) {
        if (!squareHasPiece(squares, square.index + CHECK_INDEX_RIGHT_FORWARD))
            moves.push(new Move(square.index + CHECK_INDEX_RIGHT_FORWARD))

        if (!squareHasPiece(squares, square.index + CHECK_INDEX_LEFT_FORWARD))
            moves.push(new Move(square.index + CHECK_INDEX_LEFT_FORWARD))
    } else {
        if (!squareHasPiece(squares, square.index + CHECK_INDEX_RIGTH_BACKWARD))
            moves.push(new Move(square.index + CHECK_INDEX_RIGTH_BACKWARD))

        if (!squareHasPiece(squares, square.index + CHECK_INDEX_LEFT_BACKWARD))
            moves.push(new Move(square.index + CHECK_INDEX_LEFT_BACKWARD))
    }
    return moves;
}

function returnPositionsToCapture(squares, color, position, checkIndex, excludedPosition, move) {
    let checkPosition = position + checkIndex
    let afterCapturePosition = checkPosition + checkIndex
    let squareToCapture = squares[checkPosition]

    if (afterCapturePosition < 0 || afterCapturePosition > 99 || afterCapturePosition === excludedPosition || NOT_CAPTURABLE_PIECES_INDEX.includes(checkPosition))
        return

    if (squareToCapture && squareToCapture.piece.color && squareToCapture.piece.color !== color && !squares[afterCapturePosition].piece.color) {
        return new Jump(afterCapturePosition, squareToCapture.index);
    }
}

// recursive
function calculatePossibleCaptures(squares, color, position, excludedPosition, move) {
    let jump;

    if (!move)
        move = new Move();

    jump = returnPositionsToCapture(squares, color, position, CHECK_INDEX_RIGHT_FORWARD, excludedPosition)
    if (jump) {
        move.addJump(jump);
        return calculatePossibleCaptures(squares, color, jump.toIndex, position, move);
    }

    jump = returnPositionsToCapture(squares, color, position, CHECK_INDEX_RIGTH_BACKWARD, excludedPosition)
    if (jump) {
        move.addJump(jump);
        return calculatePossibleCaptures(squares, color, jump.toIndex, position, move);
    }

    jump = returnPositionsToCapture(squares, color, position, CHECK_INDEX_LEFT_FORWARD, excludedPosition)
    if (jump) {
        move.addJump(jump);
        return calculatePossibleCaptures(squares, color, jump.toIndex, position, move);
    }

    jump = returnPositionsToCapture(squares, color, position, CHECK_INDEX_LEFT_BACKWARD, excludedPosition)
    if (jump) {
        move.addJump(jump);
        return calculatePossibleCaptures(squares, color, jump.toIndex, position, move);
    }

    if (move.jumpSequence.length > 0)
        return move;
}

function calculateMoves(pieceColor, squares) {
    const squaresWithPieces = squares.filter(square => square.piece.color === pieceColor);
    let hasCapturPossibility = false;

    squaresWithPieces.forEach(square => {
        let move = calculatePossibleCaptures(squares, square.piece.color, square.index);

        if (move) {
            hasCapturPossibility = true;
            square.piece.isMovable = true;
            square.piece.possibleMoves = [move];
        }
    });

    // if exists a capture possibility, the player must capture it
    if (hasCapturPossibility)
        return squaresWithPieces;

    squaresWithPieces.forEach(square => {
        let moves = calculatePossiblesMoves(squares, square);

        if (moves.length > 0) {
            square.piece.isMovable = true
            square.piece.possibleMoves = moves
        }
    })

    return squaresWithPieces;
}

export default { initializeBoardSquares, setSquaresToPossibleMove, isCheckerPosition, calculateMoves };
