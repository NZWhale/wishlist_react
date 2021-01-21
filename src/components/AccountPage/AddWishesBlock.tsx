import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Header, Image, Input, Modal, Segment, TextArea } from 'semantic-ui-react';
import { InputFile } from 'semantic-ui-react-input-file'
import noImage from '../../images/noImage.jpg';
import { StateInterface, User } from '../../types';
import WishesBlock from '../WishesBlock';

const addWishUrl = "http://localhost:3001/addwish"

interface AddWishesBlockProps {
    users: Array<User>
    loggedInUser: string
}

class AddWishesBlock extends React.Component<AddWishesBlockProps> {
    handleUpload = console.log("1")
    user = [{ "image": "undefined", "username": "test", "dayOfBirth": "01.01.1970", "wishes": [{ "title": "test", "url": "https://test.com", "comment": "test comment" }, { "title": "test2", "url": "https://test2.com", "comment": "second test comment" }] }]

    render() {
        const { users, loggedInUser } = this.props
        return (
            <>
                <ModalExampleModal loggedInUser={loggedInUser}/>
                <Segment >
                    <WishesBlock wishes={users[0].wishes ? users[0].wishes : this.user[0].wishes} />
                </Segment>
            </>
        )
    }
}

function ModalExampleModal(loggedInUser: any) {
    const [open, setOpen] = React.useState(false)
    const state = {
        img: "",
        title: "",
        url: "",
        comment: "",
    }

    

    const fetchNewWish = () => {
        const headers = {
            "Content-Type": "application/json"
        }

        const response = fetch(addWishUrl, {
            method: "POST",
            body: JSON.stringify({
                user: loggedInUser,
                wish: state
            }),
            headers: headers,
        }).then(response => {
            return response.json()
        }, err => {
            // console.error
            console.log(err, "data wasn't wrote")
            throw err
        })
    }

return (
    <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button>Add New Wish</Button>}
    >
        <Modal.Header>Create Wish</Modal.Header>
        <Modal.Content image>
            <Segment>
                <div style={{ marginLeft: '15%' }}>
                    <Image size='medium' style={{ paddingRight: '10px', paddingBottom: '10px' }} src={noImage} wrapped />
                    <InputFile

                        button={undefined}
                        input={{
                            id: 'input-control-id',
                            onChange: () => (console.log(1))
                        }}
                    />
                </div>
            </Segment>
            <Modal.Description style={{ paddingLeft: '10px' }}>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field
                            control={Input}
                            label='Title'
                            placeholder='Title'
                            onChange={(e: any) => (state.title = e.target.value)}
                        />
                        <Form.Field
                            control={Input}
                            label='Url'
                            placeholder='Optional'
                            onChange={(e: any) => (state.url = e.target.value)}
                        />
                    </Form.Group>

                    <Form.Field
                        control={TextArea}
                        label='Description'
                        placeholder='Enter comment... Optional'
                        onChange={(e: any) => (state.comment = e.target.value)}
                    />
                </Form>
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button color='black' onClick={() => setOpen(false)}>
                Cancel
                </Button>
            <Button
                content="Add Wish"
                labelPosition='right'
                icon='checkmark'
                onClick={() => {
                    fetchNewWish()
                    setOpen(false)
                }}
                positive
            />
        </Modal.Actions>
    </Modal>
)
}

const mapStateToProps = (state: StateInterface): AddWishesBlockProps => ({
    users: state.users,
    loggedInUser: state.loggedInUser
})

export default connect(mapStateToProps)(AddWishesBlock)