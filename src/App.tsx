import * as React from 'react';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom'
import AccountPage from './components/AccountPage';
import FriendsList from './components/FriendsList';
import 'semantic-ui-css/semantic.min.css'
import { Button, Input, Menu, Segment } from 'semantic-ui-react';




class App extends React.Component {
    state = { activeItem: 'Friends' }

    handleItemClick = (e: any, { name }: any) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state
        const history = this.props
        return (
            <div>
                <BrowserRouter>
                    <Menu pointing>
                        <Menu.Item
                            name='Friends'
                            active={activeItem === 'Friends'}
                            onClick={this.handleItemClick}
                            as={Link}
                            to="/friendslist"
                        />
                        <Menu.Item
                            name='Account'
                            active={activeItem === 'Account'}
                            onClick={this.handleItemClick}
                            as={Link}
                            to="/account"
                        />
                        { activeItem === 'Friends' &&
                        <Menu.Menu position='right'>
                            <Menu.Item>
                                <Input icon='search' placeholder='Search...' />
                                {/* TODO: create function to filter by friend's name */}
                            </Menu.Item>
                        </Menu.Menu>
                        }
                        { activeItem === 'Account' &&
                        <Menu.Menu position='right'>
                            <Menu.Item>
                            <Button basic color='black'>Exit</Button>
                            {/* TODO: create function to exit from account */}
                            </Menu.Item>
                        </Menu.Menu>
                        }
                    </Menu>

                    <Segment>
                        <Switch>
                            {/* <Route history={history} path='/login' component={LoginPage} /> */}
                            <Route history={history} path='/account' component={AccountPage} />
                            <Route history={history} path='/friendslist' component={FriendsList} />
                            <Redirect from='/' to='/friendslist' />
                        </Switch>
                    </Segment>
                </BrowserRouter>
            </div>
        )
    }
}

export default App