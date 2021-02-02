import * as React from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import { User } from '../../types';
import WishesBlock from '../WishesBlock';
import EmptyWishComponent from '../WishesBlock/EmptyWishComponent';


class AddedFriends extends React.Component {
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
            <div style={{ marginBottom: '12px' }}>
                <Accordion fluid styled>
                    <Accordion.Title
                        active={activeIndex === 2}
                        index={2}
                        onClick={this.handleClick}
                    >
                        <Icon name='dropdown' />
                        Added friends
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2}>
                        user
                    </Accordion.Content>
                </Accordion>
            </div>
        )
    }
}

export default AddedFriends