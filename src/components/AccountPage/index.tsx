import * as React from 'react';
import { Segment } from 'semantic-ui-react';
import AccountSettingsBlock from './AccountSettingsBlock';
import AddFriendsBlock from './AddFriendsBlock';
import AddWishesBlock from './AddWishesBlock';

class AccountPage extends React.Component {
    render() {
        return (
            <Segment content="left">
                        <AddFriendsBlock />
                        <AccountSettingsBlock />
                        <AddWishesBlock />
            </Segment>
        )
    }
}

export default AccountPage