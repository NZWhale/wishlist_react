import * as React from 'react';
import Header from '../Header';
import AccountSettingsBlock from './AccountSettingsBlock';

class AccountPage extends React.Component {
    render() {
        return (
            <>
                <Header activeItem={"Account"}/>
                {/* <AccountSettingsBlock /> */}
            </>
        )
    }
}

export default AccountPage