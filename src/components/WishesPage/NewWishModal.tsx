import { nanoid } from "nanoid"
import React from "react"
import { Modal, Form, Input, TextArea, Segment, Image, Button } from "semantic-ui-react"
import { InputFile } from "semantic-ui-react-input-file"
import setUsersAction from "../../store/actionCreators/setUsersAction"
import store from "../../store/store"
import { addWishUrl } from "../../utils"
import noImage from '../../images/noImage.jpg';

function NewWishModal(loggedInUser: any) {
    const [open, setOpen] = React.useState(false)
    const [image, setImage] = React.useState<string|null|ArrayBuffer>(null)
    const [title, setTitle] = React.useState("")
    const [url, setUrl] = React.useState("")
    const [comment, setComment] = React.useState("")

    function encodeImageFileAsURL(element: any) {
        var file = element.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
          console.log('RESULT', reader.result)
          setImage(reader.result)
        }
        reader.readAsDataURL(file);
      }

return (
    <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button basic color="teal">Add New Wish</Button>}
    >
        <Modal.Header>Create Wish</Modal.Header>
        <Modal.Content image>
            <Segment>
                <div style={{ marginLeft: '15%' }}>
                    <Image size='medium' style={{ paddingRight: '10px', paddingBottom: '10px' }} src={image?image:noImage} wrapped />
                    <InputFile

                        button={undefined}
                        input={{
                            id: 'input-control-id',
                            onChange: (e: any) => (encodeImageFileAsURL(e.target))
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
                            onChange={(e: any) => (setTitle(e.target.value))}
                        />
                        <Form.Field
                            control={Input}
                            label='Url'
                            placeholder='Optional'
                            onChange={(e: any) => (setUrl(e.target.value))}
                        />
                    </Form.Group>

                    <Form.Field
                        control={TextArea}
                        label='Description'
                        placeholder='Enter comment... Optional'
                        onChange={(e: any) => (setComment(e.target.value))}
                    />
                </Form>
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button basic negative onClick={() => {
                setOpen(false)
                setImage(null)
                }}>
                Cancel
                </Button>
            <Button
                content="Add Wish"
                labelPosition='right'
                icon='checkmark'
                basic
                onClick={() => {
                    if(title){
                    fetch(addWishUrl, {
                        method: "POST",
                        body: JSON.stringify({
                            user: loggedInUser,
                            wish: {
                                id: nanoid(),
                                image: image,
                                title: title,
                                url: url,
                                comment: comment,
                            }
                        }),
                        headers: {"Content-Type": "application/json"},
                    }).then(response => response.json())
                    .then(data => store.dispatch(setUsersAction(data)))
                    setOpen(false)
                } else {
                    alert('Enter title')
                }
                    setImage(null)
                    setComment("")
                    setTitle("")
                    setUrl("")
                }}
                positive
            />
        </Modal.Actions>
    </Modal>
)
}

export default NewWishModal