import { nanoid } from "nanoid"
import React from "react"
import { Button, Form, Icon, Message, Modal } from "semantic-ui-react"
import { registrationUrl } from "../../utils"

function SignUpModal() {
    const [open, setOpen] = React.useState(false)
    const [email, setEmail] = React.useState("")
    const [username, setUsername] = React.useState("")

    function registrationSubmit() {
        fetch(registrationUrl, {
            method: "POST",
            body: JSON.stringify({
                id: nanoid(),
                username: username,
                email: email,
            }),
            headers: {"Content-Type": "application/json"},
        })
    }

    return (
        <div>
            <Button
                content='Sign up'
                icon='signup'
                size='big'
                onClick={() => setOpen(true)}
            >
            </Button>

            <Modal
                size='tiny'
                dimmer="blurring"
                open={open}
                onClose={() => setOpen(false)}
            >
                <div>
                    <Message
                        attached
                        header="Welcome to Doobki's Wish List!"
                        content='Fill out the form below to sign-up for a new account'
                    />
                    <Form className='attached fluid segment'>
                        <Form.Input 
                        label='Username' 
                        placeholder='Username' 
                        type='text'
                        onChange={(e) => setUsername(e.target.value)}
                        />
                        <Form.Input 
                        label='Email' 
                        placeholder="Email" 
                        type='text' 
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button 
                        color='blue'
                        onClick={() => {
                            registrationSubmit()
                            setOpen(false)
                        }}
                        >Submit</Button>
                    </Form>
                    <Message attached='bottom' warning>
                        <Icon name='help' />
                        Already signed up?&nbsp;<a href='/login'>Login here</a>&nbsp;instead.
                    </Message>
                </div>
            </Modal>
        </div>
    )
}

export default SignUpModal