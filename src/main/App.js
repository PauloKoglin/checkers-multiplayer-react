import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch, Redirect } from 'react-router-dom'; // withRouter, Router
import { Provider } from 'react-redux';

import '../shared/global.styles.css';
import store from '../store'
import Template from '../components/Template'
import ContainerWelcome from '../containers/Main'
import NewGame from '../containers/NewGame'
import Game from '../containers/Game'
import socket from '../webSocket'

socket.connect();

export default class App extends Component {
  render() {
    const routes = (
      <Switch>
        <Route path="/" exact component={ContainerWelcome} />
        <Route path="/newGame" exact component={NewGame} />
        <Route path="/game" exact component={Game} />
        <Redirect to="/" />
      </Switch>
    )

    return (
      <Provider store={store}>
        <BrowserRouter>
          <Template appRoutes={routes} />
        </BrowserRouter>
      </Provider>)
  }
}