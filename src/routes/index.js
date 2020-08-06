import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'

import Landing from '../containers/Landing'
import NewGame from '../containers/NewGame'
import Game from '../containers/Game'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/newGame" exact component={NewGame} />
                <Route path="/game" exact component={Game} />
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;