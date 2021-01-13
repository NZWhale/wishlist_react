import * as React from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import { User } from '../../types';
import WishesBlock from '../WishesBlock';


interface OneFriendsWishesProps {
    user: User
}

class OneFriendWishes extends React.Component<OneFriendsWishesProps> {
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
            <div style={{marginBottom: '12px'}}>
                <Accordion fluid styled>
                <Accordion.Title
                    active={activeIndex === 2}
                    index={2}
                    onClick={this.handleClick}
                >
                    <Icon name='dropdown' />
                    {this.props.user.username}
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 2}>
                    <WishesBlock wishes={this.props.user.wishes ? this.props.user.wishes : []} />
                </Accordion.Content>
                </Accordion>
            </div>
        )
    }
}

export default OneFriendWishes