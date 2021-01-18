import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import App from './App';
import AccountPage from './components/AccountPage';
import LoginPage from './components/LoginPage';

class Routes extends React.Component {
    state = { 
        loggedInUser: ''
    }
    render() {
        const history = this.props
        return (
            <Switch>
                <Route path="/login" history={history} render={() => (!this.state.loggedInUser ? <LoginPage /> : <Redirect to="/account" />)} />
                <Route path="/app" history={history} render={() => (this.state.loggedInUser ? <App /> : <Redirect to="/login" />)} />
            </Switch>
        )
    }
}

export default Routes