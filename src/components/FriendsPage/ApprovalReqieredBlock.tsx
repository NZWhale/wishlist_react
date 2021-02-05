import { connect } from "react-redux";
import React from "react";
import { Button, Checkbox, Table } from "semantic-ui-react";
import { User, Friend, StateInterface, LoggedInUser } from "../../types";
import AddFriendModal from "./AddFriendModal";


interface ApprovalReqiredBlockProps {
    users: Array<User>
    loggedInUser: LoggedInUser
}

class ApprovalReqiredBlock extends React.Component<ApprovalReqiredBlockProps> {
    state = {
        isOpen: false,
    }
    getRequiredFriends(users: Array<User>, loggedInUser: LoggedInUser){
        const myFriends = users.filter((user: User) => user.id === loggedInUser.id)[0].friends
        const reqiredFriends = myFriends.filter(friend => friend.status === "required")
        return reqiredFriends
    }
    render() {
        const { users, loggedInUser } = this.props
        const requiredFriends = this.getRequiredFriends(users, loggedInUser)
        const reqiredFriendsComponent = requiredFriends.map((friend: Friend) => (
            <Table.Row>
                <Table.Cell collapsing>
                    <Checkbox slider />
                </Table.Cell>
                <Table.Cell>{friend.username}</Table.Cell>
                <Table.Cell>{friend.dayOfBirth?friend.dayOfBirth:""}</Table.Cell>
            </Table.Row>
        ))
        return (
            <Table celled compact definition>
                <Table.Header fullWidth>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell>Approval required</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {reqiredFriendsComponent}
                </Table.Body>

                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell colSpan='4'>
                            <Button basic icon="check" color="green" />
                            <Button basic icon="times" color="red" />
                            <AddFriendModal />
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        )
    }
}

const mapStateToProps = (state: StateInterface): ApprovalReqiredBlockProps => ({
    users: state.users,
    loggedInUser: state.loggedInUser
})

export default connect(mapStateToProps)(ApprovalReqiredBlock)