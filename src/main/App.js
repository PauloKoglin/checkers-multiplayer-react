import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch, Redirect } from 'react-router-dom'; // withRouter, Router
import { Provider } from 'react-redux';

import './App.css';
import store from '../store'
import Template from '../components/Template'
import Game from '../containers/Game'
import Main from '../containers/Main'

export default class App extends Component {
  render() {
    const routes = (
      <Switch>
        <Route path="/game" exact component={Main} />
        <Route path="/" exact component={Game} />
        <Redirect to="/" />
      </Switch>
    )

    return (
      <Provider store={store}>
        <BrowserRouter>
          <Template rotas={routes} />
        </BrowserRouter>
      </Provider>)
  }
}





