import * as React from 'react';
import { Accordion, Icon, Segment } from 'semantic-ui-react';
import AccountSettingsBlock from './AccountSettingsBlock';
import AddFriendsBlock from './AddFriendsBlock';
import AddWishesBlock from './AddWishesBlock';

class AccountPage extends React.Component {
    state = { activeIndex: 0 }

    handleClick = (e: any, titleProps: any) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render() {
        const { activeIndex } = this.state

        return (
            <>
                <AddFriendsBlock />

                <AccountSettingsBlock />
                <Accordion fluid styled>
                    <Accordion.Title
                        active={activeIndex === 2}
                        index={2}
                        onClick={this.handleClick}
                    >
                        <Icon name='dropdown' />
                    My Wishes
                </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2}>
                        <AddWishesBlock />
                    </Accordion.Content>
                </Accordion>

            </>
        )
    }
}

export default AccountPage