import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PulseLoader, ClipLoader } from 'react-spinners'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import axios from '../../axios'
import * as actions from '../../store/actions/game'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import './styles.css'
import socket from '../../webSocket'
import { Redirect } from 'react-router'

class NewGame extends Component {
    state = {
        controls: {
            input: {
                placeholder: 'Enter your name',
                value: '',
                required: true,
            },
            createGameButton: {
                name: 'Start',
                onClick: () => this.onCreateGameClick(),
            },
            joinGameButton: {
                name: 'Join',
                onClick: () => this.onJoinGameClick(),
            },
        },
        gameRoom: this.props.location.search.replace('?', ''),
        isLoading: false,
    }

    handleInputChange = (e) => {
        const input = this.state.controls.input;
        input.value = e.target.value;

        this.setState({ ...this.state, controls: { ...this.state.controls, input } });
    }

    onCreateGameClick = () => {
        this.setState({ ...this.state, isLoading: true });
        axios.post('/api/room',
            {
                playerName: this.state.controls.input.value
            }
        )
            .then((res) => {
                const game = res.data;

                sessionStorage.setItem('playerName', game.player1.name);
                sessionStorage.setItem('room', game.room);

                socket.emit('create_room', game);
                this.props.onCreateGame(game);
                this.setState({ ...this.state, isLoading: false });

            })
            .catch(error => {
                console.log(error);
            });
    }

    onJoinGameClick = () => {
        const playerName = this.state.controls.input.value;
        const room = this.state.gameRoom;

        sessionStorage.setItem('playerName', playerName);
        sessionStorage.setItem('room', room);

        socket.emit('join_room', playerName, room);
        socket.emit('start_game', room);
    }

    copyToClipBoard(e) {
        this.textarea.current.select();
        document.execCommand('copy');
    }

    render() {
        const button = this.state.gameRoom ? this.state.controls.joinGameButton : this.state.controls.createGameButton;

        if (this.props.isGameStarting)
            return (<Redirect to='/game' />)

        if (this.state.isLoading)
            return (<ClipLoader color={"#6CF"} />);

        if (this.props.isWatingForPlayer)
            return (
                <div className='container-cl al-center'>
                    <div>
                        <p>Waiting for secound player to start the game</p>
                    </div>
                    <PulseLoader
                        className='Loader'
                        size={20}
                        color={"#6CF"}
                        loading={true} />
                    <div>
                        <h2> Invite your friend to play with you! </h2>
                    </div>
                    <div className='container-row'>
                        <textarea
                            className='clipboard'
                            value={this.props.gameURL}
                            readOnly={true}
                            rows={1} />
                        <CopyToClipboard
                            text={this.props.gameURL}
                        >
                            <button>Copy</button>
                        </CopyToClipboard>
                    </div>
                </div>
            );

        return (
            <div className='container-cl'>
                <Input
                    placeholder={this.state.controls.input.placeholder}
                    required={this.state.controls.input.required}
                    value={this.state.controls.input.value}
                    onChange={this.handleInputChange}
                />
                <Button name={button.name}
                    onClick={button.onClick}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isWatingForPlayer: state.game.isWatingForPlayer,
        isGameStarting: state.game.isGameStarting,
        gameURL: state.game.gameURL
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onCreateGame: (game) => dispatch(actions.createGame(game)),
        onStartGame: (game) => dispatch(actions.startGame(game))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);