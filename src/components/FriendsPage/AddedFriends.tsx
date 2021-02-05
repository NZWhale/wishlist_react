import * as React from 'react';
import { connect } from 'react-redux';
import { Accordion, Button, Card, Icon, Image } from 'semantic-ui-react';
import { Friend, LoggedInUser, StateInterface, User } from '../../types';
import noImage from '../../images/noImage.jpg';
import store from '../../store/store';
import setUsers from '../../store/actionCreators/setUsersAction';
import { deleteFriendUrl } from '../../utils';

interface AddedFriendsProps {
    users: Array<User>
    loggedInUser: LoggedInUser
}

class AddedFriends extends React.Component<AddedFriendsProps> {
    state = { activeIndex: 0 }

    handleClick = (e: any, titleProps: any) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    deleteFriendRequest(id: string) {
        fetch(deleteFriendUrl, {
            method: "POST",
            body: JSON.stringify({
                id: id,
                loggedInUser: this.props.loggedInUser
            }),
            headers: { "Content-Type": "application/json" },
        })
            .then(response => response.json())
            .then(data => {
                store.dispatch(setUsers(data))
                console.log(store.getState())
            })
    }

    render() {
        const { loggedInUser, users } = this.props
        const { activeIndex } = this.state
        const myFriends = users.filter((user: User) => user.id === loggedInUser.id)[0].friends
        const myFriendsComponent = myFriends.map((friend: Friend) => (
            <Card>
                <Card.Content>
                    <Image
                        floated='right'
                        size='tiny'
                        circular
                        src={friend.image?friend.image:noImage}
                    />
                    <Card.Header>{friend.username}</Card.Header>
                    <Card.Meta>
                        {friend.dayOfBirth ? friend.dayOfBirth : ""}
                        <br />
                        {friend.status === "pending"?"Waiting for approval":""}
                        </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                        <Button 
                        basic 
                        color='red'
                        onClick={() => this.deleteFriendRequest(friend.id)}
                        >
                            Delete
                        </Button>
                </Card.Content>
            </Card>
        ))

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
                        <Card.Group>
                        {myFriendsComponent}
                        </Card.Group>
                    </Accordion.Content>
                </Accordion>
            </div>
        )
    }
}

const mapStateToProps = (state: StateInterface): AddedFriendsProps => ({
    users: state.users,
    loggedInUser: state.loggedInUser
})

export default connect(mapStateToProps)(AddedFriends)