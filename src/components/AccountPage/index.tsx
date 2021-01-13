import * as React from 'react';
import AccountSettingsBlock from './AccountSettingsBlock';
import AddFriendsBlock from './AddFriendsBlock';
import AddWishesBlock from './AddWishesBlock';

class AccountPage extends React.Component {
    render() {
        return (
            <>
                <div>
                    <AddFriendsBlock/>
                </div>
                <div>
                    <AccountSettingsBlock/>
                </div>
                <div>
                    <AddWishesBlock/>
                </div>
            </>
        )
    }
}

export default AccountPage