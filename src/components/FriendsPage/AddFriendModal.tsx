import React from "react"
import { Modal, Input, Button, Card, Image, Form } from "semantic-ui-react"
import { connect } from "react-redux"
import { StateInterface, User } from "../../types"
import { findFriendsUrl } from "../../utils"
import noImage from '../../images/noImage.jpg';

interface AddFriendsProps {

}

class AddFriendsModal extends React.Component {
    state = {
        isOpen: false,
        username: "",
        searchedUser: []
    }

    getSearchedUsers() {
        fetch(findFriendsUrl, {
            method: "POST",
            body: JSON.stringify({
                username: this.state.username,
            }),
            headers: { "Content-Type": "application/json" },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ searchedUser: data })
                console.log(this.state)
            })
    }

    render() {
        const { searchedUser } = this.state
        const searchedUsersComponent = searchedUser.map((user: User) => (
            <Card>
                <Card.Content>
                    <Image
                        floated='right'
                        size='mini'
                        src={user.image ? user.image : noImage}
                    />
                    <Card.Header>{user.username}</Card.Header>
                    <Card.Meta>{user.dayOfBirth ? user.dayOfBirth : ""}</Card.Meta>
                    <Card.Description>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button basic color='green'>
                            Send request
                    </Button>
                    </div>
                </Card.Content>
            </Card>
        ))

        return (
            <Modal
                onClose={() => this.setState({ isOpen: false })}
                onOpen={() => this.setState({ isOpen: true })}
                open={this.state.isOpen}
                style={{ width: "325px" }}
                trigger={<Button basic color="teal" style={{ marginBottom: "12px" }}>Find new friends</Button>}
            >
                <Modal.Header>Find friends</Modal.Header>
                        <Input
                            action={<Button color='blue' basic content='Search' onClick={() => this.getSearchedUsers()} />}
                            icon='users'
                            style={{ marginLeft: "17px", marginTop: "12px" }}
                            iconPosition='left'
                            placeholder='Username'
                            onChange={(e) => {
                                this.setState({ username: e.target.value })
                                console.log(this.state)
                            }}
                        />
                <Modal.Content image>
                    <Card.Group>
                        {searchedUser ? searchedUsersComponent : ""}
                    </Card.Group>

                </Modal.Content>
                <Modal.Actions>
                    <Button basic negative onClick={() => {
                        this.setState({ isOpen: false })

                    }}>
                        Cancel
                </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

const mapStateToProps = (state: StateInterface): AddFriendsProps => ({
    users: state.users,
    loggedInUser: state.loggedInUser
})


export default connect(mapStateToProps)(AddFriendsModal)