import React, { Component } from 'react'
import { connect } from 'react-redux'

import Board from '../../components/Board'
import Player from '../../components/Player'

export class Game extends Component {
    render() {
        return (
            <div className='game'>
                <Player
                    piece={this.props.player1.pieceColor}
                    captures={this.props.capturedRedPieces}
                    name={this.props.player1.name} />
                <Board />
                <Player
                    piece={this.props.player2.pieceColor}
                    captures={this.props.capturedYellowPieces}
                    name={this.props.player2.name} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        player1: state.game.player1,
        player2: state.game.player2,
        capturedRedPieces: state.game.capturedRedPieces,
        capturedYellowPieces: state.game.capturedYellowPieces,
    }
}

export default connect(mapStateToProps)(Game)