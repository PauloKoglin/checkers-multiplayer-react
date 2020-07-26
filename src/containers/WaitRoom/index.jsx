import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/game'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'

class WaitRoom extends Component {



    onClick = (playername) => {
        this.setState({ ...this.state, redirect: true });
        this.props.onStartGame(playername);
    }

    render() {
        if (this.state.redirect)
            return (<Redirect to='/game' />);

        return (
            <form>
                <div className='container-cl'>
                    <Input
                        placeholder={this.state.input.placeholder}
                        required={this.state.input.required}
                        value={this.state.input.value}
                        onChange={this.handleInputChange}
                    />
                    <Button name='Start'
                        onClick={() => this.onClick(this.state.input.value)}
                    />
                </div>
            </form>
        )
    }
}
