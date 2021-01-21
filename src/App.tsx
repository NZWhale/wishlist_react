import * as React from 'react';
import { BrowserRouter, Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import AccountPage from './components/AccountPage';
import FriendsList from './components/FriendsList';
import 'semantic-ui-css/semantic.min.css'
import { Segment } from 'semantic-ui-react';
import LoginPage from './components/LoginPage';
import { connect } from 'react-redux';
import { StateInterface } from './types';
import setUsersAction from './store/actionCreators/setUsersAction';
import store from './store/store';
import { getFriendsListUtl } from './utils';


interface AppProps {
    loggedInUser: string;
    loggedInStatus: boolean
}

class App extends React.Component<AppProps & RouteComponentProps> {

    componentDidMount() {
        fetch(getFriendsListUtl)
            .then(response => response.json())
            .then(data => store.dispatch(setUsersAction(data)))
    }

    render() {
        const { history, loggedInStatus } = this.props
        return (
            <>
                <BrowserRouter>
                    <Segment>
                        <Switch>
                            <Route history={history} path='/login' render={() =>
                                loggedInStatus ? <Redirect to="/account" /> : <LoginPage />
                            } />
                            <Route history={history} path='/account' render={() =>
                                loggedInStatus ? <AccountPage /> : <Redirect to="/login" />
                            } />
                            <Route history={history} path='/friendslist' render={() =>
                                loggedInStatus ? <FriendsList /> : <Redirect to="/login" />
                            } />
                            <Redirect from='/' to='/login' />
                        </Switch>
                    </Segment>
                </BrowserRouter>
            </>
        )
    }
}


const mapStateToProps = (state: StateInterface): AppProps => ({
    loggedInUser: state.loggedInUser,
    loggedInStatus: state.loggedInStatus
})

export default connect(mapStateToProps)(withRouter(App))