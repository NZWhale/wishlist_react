import * as React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import AccountPage from './components/AccountPage';
import FriendsList from './components/FriendsList';
import 'semantic-ui-css/semantic.min.css'
import { Segment } from 'semantic-ui-react';
import LoginPage from './components/LoginPage';




class App extends React.Component {
    state = { 
        loggedInUser: 'Little'
    }

    render() {
        const history = this.props
        return (
            <>
                <BrowserRouter>
                    <Segment>
                        <Switch>
                            <Route history={history} path='/login' render={() => (!this.state.loggedInUser ? <LoginPage /> : <Redirect to="/account" />)}/>
                            <Route history={history} path='/account' render={() => (this.state.loggedInUser ? <AccountPage/> : <Redirect to="/login" />)}/>
                            <Route history={history} path='/friendslist' render={() => (this.state.loggedInUser ? <FriendsList/> : <Redirect to="/login" />)}/>
                            <Redirect from='/' to='/login' />
                        </Switch>
                    </Segment>
                </BrowserRouter>
            </>
        )
    }
}

export default App