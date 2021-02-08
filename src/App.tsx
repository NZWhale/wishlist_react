import * as React from 'react';
import { BrowserRouter, Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom'
import AccountPage from './components/AccountPage';
import FriendsPage from './components/FriendsPage';
import WishesPage from './components/WishesPage'
import 'semantic-ui-css/semantic.min.css'
import { Segment } from 'semantic-ui-react';
import LoginPage from './components/LoginPage';
import { connect } from 'react-redux';
import { LoggedInUser, StateInterface } from './types';
import setUsersAction from './store/actionCreators/setUsersAction';
import store from './store/store';
import { checkLoginUrl, getFriendsListUtl } from './utils';
import setLoggedInStatus from './store/actionCreators/setLoggedStatus';
import setLoggedInUser from './store/actionCreators/setLoggedInUser';
import { response } from 'express';



interface AppProps {
    loggedInUser: LoggedInUser
    loggedInStatus: boolean
}

class App extends React.Component<AppProps & RouteComponentProps> {

    componentDidMount() {
        fetch(getFriendsListUtl)
            .then(response => response.json())
            .then(data => {
                store.dispatch(setUsersAction(data))
                console.log(store.getState())
            })
            
        fetch(checkLoginUrl, {
            method: "POST",
            credentials: 'include',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
        })
            .then(response => {
                if(response.status >= 400){
                    store.dispatch(setLoggedInStatus(false))
                } else {
                    const data = response.json()
                    data.then(data => {
                            store.dispatch(setLoggedInUser(data))
                            store.dispatch(setLoggedInStatus(true))
                        })
                    }
                })
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