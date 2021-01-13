import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom'
import AccountPage from './components/AccountPage';
import FriendsList from './components/FriendsList';



class App extends React.Component {
    render() {
        const history = this.props
        return (
            <Switch>
                {/* <Route history={history} path='/login' component={LoginPage} /> */}
                <Route history={history} path='/account' component={AccountPage} />
                <Route history={history} path='/friendslist' component={FriendsList} />
                <Redirect from='/' to='/friendslist' />
            </Switch>
        )
    }
}

export default App