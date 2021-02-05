import { connect } from "react-redux";
import React from "react";
import { Button, Checkbox, Table } from "semantic-ui-react";
import { User, Friend, StateInterface, LoggedInUser } from "../../types";
import AddFriendModal from "./AddFriendModal";
import { approveUrl, declineUrl } from "../../utils";
import store from "../../store/store";
import setUsers from "../../store/actionCreators/setUsersAction";


interface ApprovalReqiredBlockProps {
    users: Array<User>
    loggedInUser: LoggedInUser
}

class ApprovalReqiredBlock extends React.Component<ApprovalReqiredBlockProps> {
    state = {
        isOpen: false,
        selected: [] as Array<string>
    }
    getRequiredFriends(users: Array<User>, loggedInUser: LoggedInUser) {
        const myFriends = users.filter((user: User) => user.id === loggedInUser.id)[0].friends
        const reqiredFriends = myFriends.filter(friend => friend.status === "required")
        return reqiredFriends
    }
    sendApproveRequest() {
        fetch(approveUrl, {
            method: "POST",
            body: JSON.stringify({
                selected: this.state.selected,
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
    sendDeclineRequest() {
        fetch(declineUrl, {
            method: "POST",
            body: JSON.stringify({
                selected: this.state.selected,
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
        const { users, loggedInUser } = this.props
        const { selected } = this.state
        const requiredFriends = this.getRequiredFriends(users, loggedInUser)
        const reqiredFriendsComponent = requiredFriends.map((friend: Friend) => (
            <Table.Row>
                <Table.Cell collapsing>
                    <Checkbox
                        slider
                        onChange={() => {
                            const res = selected.find((e) => e === friend.id)
                            if (res) {
                                const index = selected.indexOf(res)
                                selected.splice(index, 1)
                            } else {
                                selected.push(friend.id)
                            }
                            console.log(this.state.selected)
                        }}
                    />
                </Table.Cell>
                <Table.Cell>{friend.username}</Table.Cell>
                <Table.Cell>{friend.dayOfBirth ? friend.dayOfBirth : ""}</Table.Cell>
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
                            <Button 
                            basic 
                            icon="check" 
                            color="green" 
                            onClick={() => this.sendApproveRequest()}
                            />
                            <Button 
                            basic 
                            icon="times" 
                            color="red" 
                            onClick={() => this.sendDeclineRequest()}
                            />
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