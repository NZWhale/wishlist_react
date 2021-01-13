import * as React from 'react';
import { OneFriendsWishes } from './OneFriendsWishes';

class FriendsList extends React.Component {
    render() {
        return (
            <>
                <OneFriendsWishes />
                <OneFriendsWishes />
                <OneFriendsWishes />
                <OneFriendsWishes />
            </>
        )
    }
}

export default FriendsList