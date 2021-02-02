import React from "react";
import { Button, Modal } from "semantic-ui-react";
import ApprovalReqiredBlock from "./ApprovalReqieredBlock";
import AddedFriends from "./AddedFriends";


class FriendsBlock extends React.Component {
    state = {
        isOpen: false,
        activeIndex: 0
    }

    handleClick = (e: any, titleProps: any) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }
    render() {
        return (
            <>
                <Modal
                    onClose={() => this.setState({ isOpen: false })}
                    onOpen={() => this.setState({ isOpen: true })}
                    open={this.state.isOpen}
                    trigger={<Button basic color="teal" style={{ marginBottom: "12px" }}>Friends</Button>}
                >
                    <Modal.Header>Friends List</Modal.Header>
                    <Modal.Content>
                        <ApprovalReqiredBlock />
                        <AddedFriends />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button basic negative onClick={() => {
                            this.setState({ isOpen: false })

                        }}>
                            Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>


            </>
        )
    }
}

export default FriendsBlock