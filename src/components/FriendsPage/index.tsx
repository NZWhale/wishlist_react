import * as React from 'react';
import { connect } from 'react-redux';
import { Loader, Segment, Image } from 'semantic-ui-react';
import { LoggedInUser, StateInterface, User } from '../../types';
import Header from '../Header';
import FriendsBlock from './FriendsBlock';
import OneFriendWishes from './OneFriendWishes';

interface FriendsPageProps {
    users: Array<User>
    loggedInUser: LoggedInUser
}

class FriendsPage extends React.Component<FriendsPageProps>{
    render() {
        let usersList
        let friends: Array<any> = []
        const { users, loggedInUser } = this.props;
        if (users.length === 0) {
            usersList =
                <Segment >
                    <div>
                        You have no friends, bro 😢
                    <br />
                        But you can find them 😊
                    </div>
                </Segment >
        } else {
            const loggedUser = users.find((user: User) => user.id === loggedInUser.id)
            if (loggedUser && loggedUser.friends.length >= 1) {
                loggedUser.friends.forEach((e) => {
                    users.forEach(user => {
                        if (user.id === e.id && e.status === "true") {
                            friends.push(user)
                        }
                    })
                })
                usersList = friends.map((user: User) =>
                    <OneFriendWishes user={user} />
                )
            } else {
                usersList =
                    <Segment >
                        <div>
                            You have no friends, bro 😢
                        <br />
                            But you can find them 😊
                        </div>
                    </Segment >
            }
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