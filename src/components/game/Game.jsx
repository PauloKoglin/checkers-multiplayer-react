import React, { Component } from 'react'
import Board from '../board/Board'
import Player from '../player/Player'

const INITIAL_STATE = {
    capturedRedPieces: 0,
    capturedYellowPieces: 0,
}

export default class Game extends Component {

    constructor(props) {
        super(props)

        this.state = {
            ...INITIAL_STATE
        }
    }

    setCapturedYellowPieces = (value) => this.setState({ ...this.state, capturedYellowPieces: value })
    setCapturedRedPieces = (value) => this.setState({ ...this.state, capturedRedPieces: value })

    incCapturedYellowPieces = () => this.setCapturedYellowPieces(this.state.capturedYellowPieces + 1)
    incCapturedRedPieces = () => this.setCapturedRedPieces(this.state.capturedRedPieces + 1)

    render() {
        return (
            <div className='game'>
                <Player
                    piece='red'
                    captures={this.state.capturedYellowPieces}
                    name="Paulo" />
                <Board
                    incCapturedRedPieces={() => this.incCapturedRedPieces()}
                    incCapturedYellowPieces={() => this.incCapturedYellowPieces()}
                />
                <Player
                    piece='yellow'
                    captures={this.state.capturedRedPieces}
                    name="Elais" />
            </div>
        )
    }
}