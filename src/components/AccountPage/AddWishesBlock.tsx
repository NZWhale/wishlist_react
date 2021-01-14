import * as React from 'react';
import { Button, Form, Header, Image, Input, Modal, Segment, TextArea } from 'semantic-ui-react';
import { InputFile } from 'semantic-ui-react-input-file'
import noImage from '../../images/noImage.jpg';
import WishesBlock from '../WishesBlock';


class AddWishesBlock extends React.Component {
    handleUpload = console.log("1")
    users = [{"image": "undefined", "username": "littlewhale", "dayOfBirth": "28.09.1994", "wishes": [{"title": "freedom", "comment": "i want to be free"}, {"title": "car", "url": "https://subaru.com", "comment": "subaru wrx sti"}, {"title": "large wish", "url": "https://none.com", "comment": "need to implement line break for large comments"}]}, {"image": "undefined", "username": "test", "dayOfBirth": "01.01.1970", "wishes": [{"title": "test", "url": "https://test.com", "comment": "test comment"}, {"title": "test2", "url": "https://test2.com", "comment": "second test comment"}]}]
    render() {
        return (
            <>
                <ModalExampleModal />
                <Segment style={{width: '39%'}}>
                    <WishesBlock wishes={this.users[0].wishes}/>
                </Segment>
            </>
        )
    }
}

function ModalExampleModal() {
    const [open, setOpen] = React.useState(false)
    const handleUpload = console.log("1")
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
                                onChange: () => handleUpload
                            }}
                        />
                    </div>
                </Segment>
                <Modal.Description style={{paddingLeft: '10px'}}> 
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field
                                control={Input}
                                label='Title'
                                placeholder='Title'
                            />
                            <Form.Field
                                control={Input}
                                label='Url'
                                placeholder='Optional'
                            />
                        </Form.Group>

                        <Form.Field
                            control={TextArea}
                            label='Description'
                            placeholder='Enter comment... Optional'
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
                    onClick={() => setOpen(false)}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default AddWishesBlock