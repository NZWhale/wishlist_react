import React from "react";
import { Button, Checkbox, Table } from "semantic-ui-react";
import AddFriendModal from "./AddFriendModal";


class ApprovalReqiredBlock extends React.Component {
    state = {
        isOpen: false,
    }
    render() {
        return (
                        <Table celled compact definition>
                            <Table.Header fullWidth>
                                <Table.Row>
                                    <Table.HeaderCell />
                                    <Table.HeaderCell>Approval required</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell collapsing>
                                        <Checkbox slider />
                                    </Table.Cell>
                                    <Table.Cell>John Lilki</Table.Cell>
                                    <Table.Cell>September 14, 2013</Table.Cell>
                                    <Table.Cell>jhlilk22@yahoo.com</Table.Cell>
                                    <Table.Cell>No</Table.Cell>
                                </Table.Row>
                            </Table.Body>

                            <Table.Footer fullWidth>
                                <Table.Row>
                                    <Table.HeaderCell />
                                    <Table.HeaderCell colSpan='4'>
                                        <Button basic color="green">Approve</Button>
                                        <AddFriendModal />
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
        )
    }
}

export default ApprovalReqiredBlock