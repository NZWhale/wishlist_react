import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Menu } from 'semantic-ui-react';

interface HeaderProps {
    activeItem: string
}

class Header extends React.Component<HeaderProps> {
    state = { 
        activeItem: this.props.activeItem,
    }

    handleItemClick = (e: any, { name }: any) => this.setState({ activeItem: name })
    render() {
        const { activeItem } = this.state
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
                                    <Button basic color='black'>Exit</Button>
                                    {/* TODO: create function to exit from account */}
                                </Menu.Item>
                            </Menu.Menu>
                        }
                    </Menu>
        )
    }
}

export default Header