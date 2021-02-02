import React from "react"
import { Modal, Input, Button } from "semantic-ui-react"
import { connect } from "react-redux"
import { StateInterface } from "../../types"

interface AddFriendsProps {

}

class AddFriendsModal extends React.Component {
    state = {
        isOpen: false,
    }
    render() {
        return (
            <Modal
                onClose={() => this.setState({ isOpen: false })}
                onOpen={() => this.setState({ isOpen: true })}
                open={this.state.isOpen}
                size="mini"
                trigger={<Button basic color="teal" style={{ marginBottom: "12px" }}>Find new friends</Button>}
            >
                <Modal.Header>Create Wish</Modal.Header>
                <Modal.Content image>
                    <Input
                        action={{ color: 'blue', basic: "true",  content: 'Search' }}
                        icon='users'
                        iconPosition='left'
                        placeholder='Username'
                    />

                </Modal.Content>
                <Modal.Actions>
                    <Button basic negative onClick={() => {
                        this.setState({ isOpen: false })

                    }}>
                        Cancel
                </Button>
                    <Button
                        content="Add Wish"
                        labelPosition='right'
                        icon='checkmark'
                        basic
                        onClick={() => {
                            this.setState({ isOpen: false })
                        }}
                        positive
                    />
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