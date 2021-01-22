import * as React from 'react';
import { connect } from 'react-redux';
import { Accordion } from 'semantic-ui-react';
import { StateInterface, User } from '../../types';
import Header from '../Header';
import OneFriendWishes from './OneFriendWishes';

interface FriendsListProps {
    users: Array<User>
    loggedInUser: {
        username: string
        id: string
    }
}

class FriendsList extends React.Component<FriendsListProps>{
    render() {
        let usersList
        const { users, loggedInUser } = this.props;
        if (users) {
            const filteredUsers = users.filter((user: User) => user.id !== loggedInUser.id)
            usersList = filteredUsers.map((user: User) =>
                <OneFriendWishes user={user} />
            )
        } else {
            usersList = <div></div>
        }
        return (
            <>
                <Header activeItem={"Friends"} />
                {usersList}
            </>
        )
    }
}

const mapStateToProps = (state: StateInterface): FriendsListProps => ({
    users: state.users,
    loggedInUser: state.loggedInUser
})

export default connect(mapStateToProps)(FriendsList)