import './Board.css'
import React, { Component } from 'react'
import Square from '../square/Square'

const RED_PIECE = 'red';
const YELLOW_PIECE = 'yellow';

class Board extends Component {



    constructor(props) {
        super(props)

        this.state = {
            squares: new Array(100).fill({ color: null, index: null, piece: null, selected: false }),
        }
    }

    // addClass(param) {
    //     this.state.classes.push(param)        
    // }

    // removeClass(param) {
    //     let list = this.state.classes.filter(c => c !== param)
    //     this.setState({ classes: list })
    // }

    // getSquareClasses() {
    //     let list = ''
    //     this.state.classes.forEach(item => list += item + ' ')
    //     console.log(this.state)
    //     return list
    // }

    onClickSquare(i) {
        let squares = this.state.squares
        squares[i].selected = !this.state.squares[i].selected
        this.setState(squares)
        console.log("clicou")
    }

    renderSquares() {
        let line = 0
        let index = 0
        let piece = ""
        // let newSquare = {}
        return this.state.squares.map((square, i) => {
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

            this.state.squares[i] = square

            return (
                <Square
                    // getSquareClasses={() => this.getSquareClasses()}
                    onClick={() => this.onClickSquare(i)}
                    key={i}
                    config={this.state.squares[i]}>
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


