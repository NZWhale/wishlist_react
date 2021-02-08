import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Button, Input, Menu } from 'semantic-ui-react';
import setLoggedInStatus from '../store/actionCreators/setLoggedStatus';
import store from '../store/store';
import { StateInterface } from '../types';
import cookie from 'js-cookie';

interface HeaderProps extends HeaderPropsFromState {
    activeItem: string;
}

interface HeaderPropsFromState {
    loggedInUser: {
        username: string;
        id: string;
    }
}


class Header extends React.Component<HeaderProps & RouteComponentProps> {
    state = {
        activeItem: this.props.activeItem,
    }

    handleItemClick = (e: any, { name }: any) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state
        const { history } = this.props
        return (
            <Menu pointing style={{ height: "50px" }}>
                <Menu.Item
                    name='Friends'
                    active={activeItem === 'Friends'}
                    onClick={this.handleItemClick}
                    as={Link}
                    to="/friends"
                />
                <Menu.Item
                    name='Wishes'
                    active={activeItem === 'Wishes'}
                    onClick={this.handleItemClick}
                    as={Link}
                    to="/wishes"
                />
                <Menu.Item
                    name='Account'
                    active={activeItem === 'Account'}
                    onClick={this.handleItemClick}
                    as={Link}
                    to="/account"
                />
                {activeItem === 'Account' &&
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Button basic
                                color='black'
                                onClick={() => {
                                    console.log(this.props.loggedInUser)
                                    store.dispatch(setLoggedInStatus(false))
                                    cookie.remove("auth-token")
                                    history.push('/login')
                                }}
                            >Exit</Button>
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