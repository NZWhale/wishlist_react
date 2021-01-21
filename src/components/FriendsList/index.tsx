import * as React from 'react';
import { connect } from 'react-redux';
import { Accordion } from 'semantic-ui-react';
import { StateInterface, User } from '../../types';
import Header from '../Header';
import OneFriendWishes from './OneFriendWishes';

interface FriendsListProps {
    users: Array<User>
}

class FriendsList extends React.Component<FriendsListProps>{
    render() {
        const {users} = this.props;
        const usersList = users.map((user: User) =>
                <OneFriendWishes user={user} />
            )
        return (
            <>
                <Header activeItem={"Friends"}/>
                {usersList}
            </>
        )
    }
}

const mapStateToProps = (state: StateInterface): FriendsListProps => ({
    users: state.users
})

export default connect(mapStateToProps)(FriendsList)