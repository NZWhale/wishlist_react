import * as React from 'react';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { StateInterface, User } from '../../types';
import Header from '../Header';
import FriendsBlock from './FriendsBlock';
import OneFriendWishes from './OneFriendWishes';

interface FriendsPageProps {
    users: Array<User>
    loggedInUser: {
        username: string
        id: string
    }
}

class FriendsPage extends React.Component<FriendsPageProps>{
    render() {
        let usersList
        const { users, loggedInUser } = this.props;
        if (users.length > 1) {
            const filteredUsers = users.filter((user: User) => user.id !== loggedInUser.id)
            usersList = filteredUsers.map((user: User) =>
                <OneFriendWishes user={user} />
            )
        } else {
            usersList = 
            <Segment >
            <div>
                You have no friends, bro 😢
                <br/>
                But you can find them 😊
            </div>
            </Segment >

        }
        return (
            <>
                <Header activeItem={"Friends"} />
                <FriendsBlock />
                {usersList}
            </>
        )
    }
}

const mapStateToProps = (state: StateInterface): FriendsPageProps => ({
    users: state.users,
    loggedInUser: state.loggedInUser
})

export default connect(mapStateToProps)(FriendsPage)