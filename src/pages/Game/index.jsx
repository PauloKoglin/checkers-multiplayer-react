import React, { Component } from 'react'
import { connect } from 'react-redux'

import Board from '../../components/Board'
import Player from '../../components/Player'
import { Redirect } from 'react-router'

export class Game extends Component {
    render() {
        if (!this.props.isGameStarted)
            return (<Redirect to='/newGame' />)

        return (
            <div className='game'>
                <Player
                    captures={this.props.capturedRedPieces}
                    name={this.props.game ? this.props.game.secondPlayer.name : 'Waiting for player'} />
                <Board />
                <Player
                    captures={this.props.capturedYellowPieces}
                    name={this.props.game ? this.props.game.firstPlayer.name : 'Waiting for player'} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        game: state.game.game,
        capturedRedPieces: state.game.capturedRedPieces,
        capturedYellowPieces: state.game.capturedYellowPieces,
        isGameStarted: state.game.isGameStarted,
    }
}

export default connect(mapStateToProps)(Game)