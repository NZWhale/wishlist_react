import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, Input, Menu } from 'semantic-ui-react';
import setLoggedInUser from '../store/actionCreators/setLoggedInUser';
import setLoggedInStatus from '../store/actionCreators/setLoggedStatus';
import store from '../store/store';
import { StateInterface } from '../types';

interface HeaderProps extends HeaderPropsFromState{
    activeItem: string;
}

interface HeaderPropsFromState{
    loggedInUser: string;
}


class Header extends React.Component<HeaderProps & RouteComponentProps> {
    state = { 
        activeItem: this.props.activeItem,
    }

    handleItemClick = (e: any, { name }: any) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state
        const { match, history } = this.props
                return (
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
                        {activeItem === 'Friends' &&
                            <Menu.Menu position='right'>
                                <Menu.Item>
                                    <Input icon='users' iconPosition='left' placeholder='Search users...' />
                                    {/* TODO: create function to filter by friend's name */}
                                </Menu.Item>
                            </Menu.Menu>
                        }
                        {activeItem === 'Account' &&
                            <Menu.Menu position='right'>
                                <Menu.Item>
                                    <Button basic 
                                    color='black'
                                    onClick={() => {
                                        console.log(this.props.loggedInUser)
                                        store.dispatch(setLoggedInStatus(false))
                                        history.push('/login')
                                    }}
                                    >Exit</Button>
                                    {/* TODO: create function to exit from account */}
                                </Menu.Item>
                            </Menu.Menu>
                        }
                    </Menu>
        )
    }
}


const mapStateToProps = (state: StateInterface): HeaderPropsFromState => ({
    loggedInUser: state.loggedInUser
})

export default connect(mapStateToProps)(withRouter(Header))