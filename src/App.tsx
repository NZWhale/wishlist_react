import * as React from 'react';
import { BrowserRouter, Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import AccountPage from './components/AccountPage';
import FriendsPage from './components/FriendsPage';
import WishesPage from './components/WishesPage'
import 'semantic-ui-css/semantic.min.css'
import { Segment } from 'semantic-ui-react';
import LoginPage from './components/LoginPage';
import { connect } from 'react-redux';
import { StateInterface } from './types';
import setUsersAction from './store/actionCreators/setUsersAction';
import store from './store/store';
import { getFriendsListUtl } from './utils';


interface AppProps {
    loggedInUser: {
        username: string;
        id: string;
    }
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
                                loggedInStatus ? <Redirect to="/friends" /> : <LoginPage />
                            } />
                            <Route history={history} path='/wishes' render={() =>
                                loggedInStatus ? <WishesPage /> : <Redirect to="/login" />
                            } />
                               <Route history={history} path='/account' render={() =>
                                loggedInStatus ? <AccountPage /> : <Redirect to="/login" />
                            } />
                            <Route history={history} path='/friends' render={() =>
                                loggedInStatus ? <FriendsPage /> : <Redirect to="/login" />
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