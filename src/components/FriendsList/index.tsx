import * as React from 'react';
import { Accordion } from 'semantic-ui-react';
import { User } from '../../types';
import OneFriendWishes from './OneFriendWishes';

interface FriendsListProps {
    users: Array<User>
}

class FriendsList extends React.Component<FriendsListProps> {
    users = [{"image": "undefined", "username": "littlewhale", "dayOfBirth": "28.09.1994", "wishes": [{"title": "freedom", "comment": "i want to be free"}, {"title": "car", "url": "https://subaru.com", "comment": "subaru wrx sti"}]}, {"image": "undefined", "username": "test", "dayOfBirth": "01.01.1970", "wishes": [{"title": "test", "url": "https://test.com", "comment": "test comment"}, {"title": "test2", "url": "https://test2.com", "comment": "second test comment"}]}]

    render() {
        const usersList = this.users.map((user: User) =>
                <OneFriendWishes user={user} />
            )
        return (
            <>
                {usersList}
            </>
        )
    }
}

export default FriendsList