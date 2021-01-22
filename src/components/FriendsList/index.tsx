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
        let usersList
        const {users} = this.props;
        if(users){
        usersList = users.map((user: User) =>
                <OneFriendWishes user={user} />
            )
        } else {
            usersList = <div></div>
        }
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